# Overview

"Through The Nest" is a photography portfolio website built as a full-stack application. It's a modern, responsive platform showcasing professional photography services including weddings, portraits, cultural events, and lifestyle photography. The site features a comprehensive portfolio gallery, service offerings, contact forms, and client testimonials, all designed with a focus on visual storytelling and user experience.

## Recent Changes (August 8, 2025)
- ✓ Successfully pushed complete project to GitHub: https://github.com/JosephYika/through-the-nest-portfolio
- ✓ Updated contact information: Austin as Editor in Chief, Leicester UK location, UK phone number
- ✓ Optimized all images to webp format for better performance
- ✓ Implemented comprehensive lazy loading with intersection observer
- ✓ Updated services pricing to UK pounds (£350, £2,200, £950)
- ✓ Enhanced About section with professional portrait and UK experience details
- ✓ Fixed location display: "Based in Leicester, UK - Available Worldwide"
- ✓ Cleaned up hero section with proper flexbox centering (removed manual pixel translations)
- ✓ Major cleanup: Removed 30+ unused UI components, keeping only essential ones (Button, Input, Textarea, Select, Card, Toast, Tooltip)
- ✓ Image cleanup: Removed all unused PNG/JPG files, kept only webp images in use and essential public images
- ✓ File structure optimized: Reduced UI components from 40+ to 10 essential files

## Wedding Image Performance Optimization (August 9, 2025)
- ✓ Replaced static image imports with dynamic paths for wedding category
- ✓ Implemented LQIP (Low Quality Image Placeholders) with blur effects  
- ✓ Added responsive images with srcset and sizes for mobile optimization
- ✓ Created virtualized wedding gallery with incremental loading (3 initial, 2 more on scroll)
- ✓ Enhanced Intersection Observer lazy loading with 100px margin
- ✓ Optimized loading animations and error handling
- ✓ Maintained all existing functionality (lightbox, animations, hover effects)

## Sharp Image Optimization (August 9, 2025)
- ✓ Implemented sharp-cli optimization with 75% quality compression
- ✓ Generated 4 image sizes per photo: thumbnail (400px, ~12-21KB), medium (800px, ~31-51KB), large (1600px, ~76-141KB), original (2000px, ~103-197KB)
- ✓ Updated image optimization system to use optimized versions with proper srcset
- ✓ Applied fade-up scroll animations to all portfolio categories with staggered timing
- ✓ Perfect size targets achieved: thumbnails 40-80KB, lightbox 200-300KB as recommended

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client is built with **React 18** using TypeScript and follows a component-based architecture with:

- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system including photography-specific color palette (ivory, charcoal, soft-gold)
- **Animations**: GSAP for scroll-triggered animations and visual effects
- **Theme Support**: Light/dark theme switching with context provider

## Backend Architecture

The server uses **Express.js** with TypeScript following a RESTful API pattern:

- **Runtime**: Node.js with ESM modules
- **Development**: tsx for TypeScript execution in development
- **Storage**: Memory storage implementation with interface for easy database switching
- **API Endpoints**: Contact form submission and retrieval endpoints
- **Error Handling**: Centralized error middleware with structured responses

## Data Layer

Currently implements **in-memory storage** with interface abstraction:

- **Schema Definition**: Drizzle ORM schemas with PostgreSQL dialect configuration
- **Type Safety**: Zod schemas for validation and TypeScript type inference
- **Database Ready**: Configured for PostgreSQL with Neon serverless connection
- **Data Models**: Users table and contact submissions table with proper relationships

## Development & Build System

- **Bundler**: Vite for fast development and optimized production builds
- **TypeScript**: Strict type checking across client, server, and shared code
- **Asset Management**: Vite asset handling with path resolution for images
- **Development Tools**: Hot module replacement, runtime error overlay for Replit
- **Build Process**: Separate client (Vite) and server (esbuild) build processes

## UI/UX Design Decisions

The application implements a photography-focused design system:

- **Typography**: Inter font family with custom font weights for readability
- **Color Palette**: Custom CSS variables for photography themes (ivory, charcoal, soft-gold)
- **Layout**: Mobile-first responsive design with CSS Grid and Flexbox
- **Animations**: GSAP-powered scroll animations and parallax effects
- **Accessibility**: Radix UI primitives ensure ARIA compliance and keyboard navigation

# External Dependencies

## Core Framework & Runtime
- **React 18**: Frontend framework with TypeScript support
- **Express.js**: Backend web framework
- **Node.js**: Server runtime environment

## Database & ORM
- **Drizzle ORM**: Type-safe SQL query builder and schema management
- **@neondatabase/serverless**: PostgreSQL serverless driver for Neon
- **PostgreSQL**: Target database (configured but not active)

## UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI
- **Radix UI**: Headless UI primitives for accessibility
- **GSAP**: Animation library for scroll-triggered effects
- **Font Awesome**: Icon library for UI elements

## Form & Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for type safety
- **@hookform/resolvers**: Integration between React Hook Form and Zod

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production server builds

## Third-Party Services
- **Google Fonts**: Web font delivery (Inter font family)
- **Replit**: Development platform with specialized plugins and banners
- **CDN Resources**: GSAP and Font Awesome loaded via CDN for performance

## State Management
- **TanStack Query**: Server state management and caching
- **React Context**: Theme switching and global state management