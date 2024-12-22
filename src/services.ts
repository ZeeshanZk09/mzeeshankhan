interface TypeImage {
  src: string;
  txt: string;
}

export type TypeService = {
  id: number;
  title: string;
  description: string[];
  image?: TypeImage[];
};

export const services: TypeService[] = [
  {
    id: 1,
    title: "Custom Website Development",
    description: [
      "Design and develop unique, fully responsive websites that deliver a seamless user experience.",
      "Expertise in modern frameworks like React, Next.js, and Tailwind CSS to create fast, dynamic, and visually appealing websites.",
    ],
    image: [
      {
        src: `/assets/images/services/Custom Website Development.png`,
        txt: `Custom Website Development`,
      },
    ],
  },
  {
    id: 2,
    title: "E commerce Solutions",
    description: [
      "Build robust and scalable e-commerce platforms for your online business.",
      "Integration with payment gateways, inventory management, and user-friendly interfaces to enhance customer experience.",
    ],
    image: [
      {
        src: `/assets/images/services/E commerce Solutions.png`,
        txt: `E commerce Solutions`,
      },
    ],
  },
  {
    id: 3,
    title: "Landing Pages & Portfolio Websites",
    description: [
      "Create engaging and conversion-focused landing pages for marketing campaigns, product launches, or personal branding.",
      "Professional portfolio websites for showcasing your work or business.",
    ],
    image: [
      {
        src: `/assets/images/services/Landing Pages & Portfolio Websites.png`,
        txt: `Landing Pages & Portfolio Websites`
      }
    ]
  },
  {
    id: 4,
    title: "Full Stack Development",
    description: [
      "Develop end-to-end solutions with both front-end and back-end capabilities.",
      "Expertise in technologies like Node.js, Express, and database management (MongoDB).",
    ],
    image: [
      {
        src: `/assets/images/services/Full Stack Development.png`,
        txt: `Full Stack Development`
      }
    ]
  },
  {
    id: 5,
    title: "Website Redesign and Maintenance",
    description: [
      "Revamp outdated websites to give them a fresh, modern look.",
      "Regular updates, performance optimization, and technical support to ensure your site runs smoothly.",
    ],
    image: [
      {
        src: `/assets/images/services/Website Redesign and Maintenance.gif`,
        txt: `Website Redesign and Maintenance`
      }
    ]
  },
  {
    id: 6,
    title: "UI/UX Design",
    description: [
      "Design intuitive and visually stunning interfaces that enhance user engagement.",
      "Focus on usability, accessibility, and responsive designs across all devices.",
    ],
    image: [
      {
        src: `/assets/images/services/UI UX Design.gif`,
        txt: `UI/UX Design`
      }
    ]
  },
  {
    id: 7,
    title: "Content Management System (CMS) Development",
    description: [
      "Build CMS-based websites with platforms like WordPress or custom solutions.",
      "Easy-to-manage content systems for blogs, news portals, and more.",
    ],
    image: [
      {
        src: `/assets/images/services/Content Management System (CMS) Development.png`,
        txt: `Content Management System (CMS) Development`
      }
    ]
  },
  {
    id: 8,
    title: "Progressive Web Apps (PWAs)",
    description: [
      "Develop PWAs for a native-app-like experience directly through the browser.",
      "Fast loading, offline support, and push notifications to engage users.",
    ],
    image: [
      {
        src: `/assets/images/services/Progressive Web Apps (PWAs).png`,
        txt: `Progressive Web Apps (PWAs)`
      }
    ]
  },
  {
    id: 9,
    title: "SEO Optimization",
    description: [
      "Optimize websites for search engines to improve visibility and organic reach.",
      "Implement technical SEO best practices and integrate tools like Google Analytics.",
    ],
    image: [
      {
        src: `/assets/images/services/SEO Optimization.png`,
        txt: `SEO Optimization`
      }
    ]
  },
  {
    id: 10,
    title: "API Integration & Development",
    description: [
      "Seamlessly integrate third-party APIs for additional functionalities like payment systems, maps, and more.",
      "Build custom APIs to connect your applications efficiently.",
    ],
    image: [
      {
        src: `/assets/images/services/API Integration & Development.png`,
        txt: `API Integration & Development`
      }
    ]
  },
  {
    id: 11,
    title: "Web Application Development",
    description: [
      "Create complex, interactive web applications for businesses and startups.",
      "Expertise in building dashboards, management systems, and real-time apps.",
    ],
    image: [
      {
        src: `/assets/images/services/Web Application Development.png`,
        txt: `Web Application Development`
      }
    ]
  },
  {
    id: 12,
    title: "Chatbot and AI Integration",
    description: [
      "Integrate AI-based chatbots and automation tools to improve customer interaction and operational efficiency.",
    ],
    image: [
      {
        src: `/assets/images/services/Chatbot and AI Integration.png`,
        txt: `Chatbot and AI Integration`
      }
    ]
  },
];
