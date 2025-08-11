import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactEmail, sendContactEmailSMTP } from "./services/email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Save to storage (optional - you can remove this if you only want email)
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notification
      try {
        await sendContactEmail(validatedData);
        console.log("Contact email sent successfully");
      } catch (emailError) {
        console.error("Primary email service failed, trying backup SMTP:", emailError);
        try {
          await sendContactEmailSMTP(validatedData);
          console.log("Contact email sent via SMTP backup");
        } catch (smtpError) {
          console.error("Both email services failed:", smtpError);
          // Don't fail the entire request if email fails
          console.warn("Email notification failed, but form submission was saved");
        }
      }
      
      res.json({ 
        success: true, 
        message: "Contact form submitted successfully and email notification sent",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form submission error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
