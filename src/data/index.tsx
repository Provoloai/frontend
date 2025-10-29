import { ProposalData } from "@/types";

export interface ProposalHistoryItem {
  id: string;
  title: string;
  createdAt: string;
  data: ProposalData;
}

export const proposalHistory: ProposalHistoryItem[] = [
  {
    id: "1",
    title: "E-commerce Platform Redesign",
    createdAt: "2025-10-25T14:30:00Z",
    data: {
      hook: "Transform your online store into a conversion powerhouse with modern UX principles and mobile-first design that increases sales by up to 40%.",
      solution: "Complete redesign of your e-commerce platform focusing on user experience, performance optimization, and conversion rate improvements through A/B tested design patterns.",
      keyPoints: [
        "Mobile-responsive design with seamless checkout flow",
        "Performance optimization for 2-second load times",
        "Integration of AI-powered product recommendations",
        "Enhanced search functionality with filters and sorting"
      ],
      portfolioLink: "https://portfolio.example.com/ecommerce-projects",
      availability: "Available to start immediately. Project timeline: 8-10 weeks with weekly sprint reviews.",
      support: "Includes 3 months post-launch support, bug fixes, and training for your team on the new platform.",
      closing: "Let's schedule a call this week to discuss your vision and how we can bring it to life. Looking forward to partnering with you!",
      mdx: `# E-commerce Platform Redesign Proposal\n\n## Overview\nTransform your online store into a conversion powerhouse...\n\n## Solution Approach\nComplete redesign focusing on:\n- User Experience\n- Performance\n- Conversion Optimization\n\n## Key Deliverables\n- Mobile-responsive design\n- Performance optimization\n- AI-powered recommendations\n- Enhanced search functionality\n\n## Timeline & Availability\nAvailable immediately. 8-10 weeks delivery.\n\n## Support\n3 months post-launch support included.\n\n## Next Steps\nLet's schedule a call to discuss your vision!`
    }
  },
  {
    id: "2",
    title: "Mobile App Development",
    createdAt: "2025-10-24T10:15:00Z",
    data: {
      hook: "Bring your business to your customers' fingertips with a native mobile app that delivers seamless experiences on both iOS and Android.",
      solution: "End-to-end mobile app development using React Native, ensuring cross-platform compatibility while maintaining native performance and user experience.",
      keyPoints: [
        "Cross-platform development for iOS and Android",
        "Real-time synchronization with cloud backend",
        "Push notifications and in-app messaging",
        "Offline-first architecture for uninterrupted access"
      ],
      portfolioLink: "https://portfolio.example.com/mobile-apps",
      availability: "Can begin development next week. Estimated timeline: 12-16 weeks including testing and deployment.",
      support: "Includes 6 months maintenance, app store optimization, and performance monitoring.",
      closing: "Ready to take your business mobile? Let's connect and turn your app idea into reality.",
      mdx: `# Mobile App Development Proposal\n\n## Introduction\nBring your business to customers' fingertips...\n\n## Technical Approach\n- React Native for cross-platform development\n- Cloud-native backend integration\n- Real-time data synchronization\n\n## Features\n- iOS & Android support\n- Push notifications\n- Offline functionality\n- Secure authentication\n\n## Timeline\n12-16 weeks delivery timeline.\n\n## Post-Launch Support\n6 months maintenance and optimization included.\n\n## Let's Connect\nReady to discuss your mobile vision!`
    }
  },
  {
    id: "3",
    title: "SEO Optimization Services",
    createdAt: "2025-10-23T16:45:00Z",
    data: {
      hook: "Dominate search rankings and drive organic traffic with data-driven SEO strategies that deliver measurable results within 90 days.",
      solution: "Comprehensive SEO audit and implementation including technical SEO, content optimization, link building, and local SEO strategies tailored to your industry.",
      keyPoints: [
        "Complete technical SEO audit and fixes",
        "Keyword research and content optimization strategy",
        "High-quality backlink acquisition program",
        "Monthly performance reports with actionable insights"
      ],
      portfolioLink: "https://portfolio.example.com/seo-case-studies",
      availability: "Ready to start immediately. Initial audit completed within 2 weeks, ongoing optimization for 6 months.",
      support: "Continuous monitoring, monthly strategy adjustments, and quarterly competitor analysis included.",
      closing: "Let's boost your search visibility and drive qualified leads to your business. Schedule a free SEO audit call today!",
      mdx: `# SEO Optimization Proposal\n\n## Executive Summary\nDominate search rankings with data-driven strategies...\n\n## Our Approach\n1. Technical SEO Audit\n2. Keyword Research\n3. Content Optimization\n4. Link Building\n\n## Deliverables\n- Complete technical fixes\n- Optimized content strategy\n- Quality backlinks\n- Monthly reports\n\n## Timeline\nInitial audit: 2 weeks\nOngoing optimization: 6 months\n\n## Ongoing Support\nContinuous monitoring and adjustments.\n\n## Get Started\nSchedule your free SEO audit today!`
    }
  },
  {
    id: "4",
    title: "Brand Identity Package",
    createdAt: "2025-10-22T09:20:00Z",
    data: {
      hook: "Build a memorable brand that resonates with your audience through strategic design, compelling messaging, and consistent visual identity.",
      solution: "Full brand identity development including logo design, color palette, typography, brand guidelines, and marketing collateral to establish a strong market presence.",
      keyPoints: [
        "Custom logo design with 3 concept variations",
        "Complete brand style guide and usage guidelines",
        "Business card, letterhead, and email signature designs",
        "Social media templates and brand assets"
      ],
      portfolioLink: "https://portfolio.example.com/brand-design",
      availability: "Available to start next Monday. Complete brand package delivered in 4-6 weeks.",
      support: "Includes 2 revision rounds per deliverable and 30-day post-delivery support for any adjustments.",
      closing: "Let's create a brand identity that sets you apart from the competition. Excited to bring your vision to life!",
      mdx: `# Brand Identity Package Proposal\n\n## Overview\nBuild a memorable brand that resonates...\n\n## Package Includes\n- Logo Design (3 concepts)\n- Brand Style Guide\n- Business Collateral\n- Social Media Templates\n\n## Design Process\n1. Discovery & Research\n2. Concept Development\n3. Refinement\n4. Final Delivery\n\n## Timeline\n4-6 weeks complete delivery.\n\n## Revisions & Support\n2 revision rounds included\n30-day post-delivery support\n\n## Next Steps\nLet's create your unique brand identity!`
    }
  },
  {
    id: "5",
    title: "Content Management System",
    createdAt: "2025-10-21T13:00:00Z",
    data: {
      hook: "Take control of your website content with a custom CMS built for your specific workflow, empowering your team to manage content without technical expertise.",
      solution: "Custom headless CMS development using modern technologies like Strapi or Sanity, providing intuitive content editing with powerful API capabilities for multi-channel publishing.",
      keyPoints: [
        "Intuitive content editor with drag-and-drop functionality",
        "Role-based access control for team collaboration",
        "RESTful and GraphQL API support",
        "Media management with automatic image optimization"
      ],
      portfolioLink: "https://portfolio.example.com/cms-projects",
      availability: "Can commence development immediately. Estimated completion: 10-12 weeks including training.",
      support: "Includes comprehensive documentation, team training sessions, and 4 months technical support.",
      closing: "Ready to streamline your content workflow? Let's build a CMS that grows with your business.",
      mdx: `# Content Management System Proposal\n\n## Introduction\nTake control of your content with a custom CMS...\n\n## Technical Solution\n- Headless CMS architecture\n- Modern tech stack (Strapi/Sanity)\n- API-first approach\n- Cloud-hosted infrastructure\n\n## Key Features\n- Drag-and-drop editor\n- Role-based access\n- Multi-channel publishing\n- Media optimization\n\n## Development Timeline\n10-12 weeks including training.\n\n## Training & Support\n- Team training sessions\n- Complete documentation\n- 4 months technical support\n\n## Get Started\nLet's build your perfect CMS!`
    }
  }
];