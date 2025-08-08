import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  eventDate: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      eventDate: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We will get back to you soon.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 fade-in">
          <h2 className="font-copernicus text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Get In Touch</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
            Contact Austin our Editor in Chief to discuss your vision and create something beautiful together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="fade-in">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <Input
                    {...register("firstName")}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-soft-gold focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <Input
                    {...register("lastName")}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-soft-gold focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-soft-gold focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone (Optional)
                </label>
                <Input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-soft-gold focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service Interest
                </label>
                <Select onValueChange={(value) => setValue("service", value)}>
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-soft-gold focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding Photography</SelectItem>
                    <SelectItem value="portrait">Portrait Session</SelectItem>
                    <SelectItem value="cultural">Cultural Event</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle Session</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.service && (
                  <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Date
                </label>
                <Input
                  type="date"
                  {...register("eventDate")}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-soft-gold focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tell us about your vision
                </label>
                <Textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Share details about your event, style preferences, and any special requirements..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-soft-gold focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-soft-gold hover:bg-yellow-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="fade-in">
            <div className="bg-ivory dark:bg-gray-800 rounded-2xl p-8 h-full">
              <h3 className="font-copernicus text-2xl font-bold mb-6">Let's Connect</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-soft-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">austinenekwe47@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-soft-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-300">+44 7440 559897</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-soft-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Studio Location</h4>
                    <p className="text-gray-600 dark:text-gray-300">Based in Leicester, UK<br />Available Worldwide</p>
                  </div>
                </div>
              </div>
              

              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-soft-gold hover:bg-yellow-600 rounded-full flex items-center justify-center text-white transition-colors duration-200">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-soft-gold hover:bg-yellow-600 rounded-full flex items-center justify-center text-white transition-colors duration-200">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-soft-gold hover:bg-yellow-600 rounded-full flex items-center justify-center text-white transition-colors duration-200">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
