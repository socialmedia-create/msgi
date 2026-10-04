// Central Data Source for EDI CLUB Frontend Website
// Easily editable for events, team, celebrations, gallery, and impact metrics.

const EDI_DATA = {
  clubInfo: {
    name: "EDI CLUB",
    fullName: "Entrepreneurship Development & Innovation Club",
    tagline: "Think. Innovate. Build. Lead.",
    subtitle: "EDI CLUB | INNOVATION • ENTREPRENEURSHIP • IMPACT",
    heroDescription: "Empowering students to transform ideas into meaningful solutions through innovation, entrepreneurship, collaboration and real-world experiences.",
    aboutHeading: "About EDI Club",
    aboutDescription: "EDI Club is a student-driven platform dedicated to nurturing entrepreneurial thinking, innovation and problem-solving. The club provides students with opportunities to explore ideas, collaborate across disciplines, develop practical skills and transform concepts into real-world solutions.",
    motto: "Think Innovatively. Collaborate Boldly. Build Impactfully. Lead Fearlessly.",
    contact: {
      college: "Meenakshi Sundararajan Engineering College",
      department: "Innovation & Entrepreneurship Cell",
      campus: "Kodambakkam, Chennai - 024",
      email: "edi.club@msec.edu.in",
      instagram: "instagram.com/edi_club",
      linkedin: "linkedin.com/company/edi-club"
    }
  },

  vision: {
    heading: "OUR VISION",
    statement: "To cultivate a thriving ecosystem of entrepreneurial thinkers and innovators — empowering students to become visionary problem-solvers, industry-ready developers, and future tech leaders who drive meaningful change.",
    highlightWords: [
      "entrepreneurial thinkers",
      "innovators",
      "visionary problem-solvers",
      "industry-ready developers",
      "future tech leaders"
    ],
    pillars: [
      {
        number: "01",
        title: "THINK INNOVATIVELY",
        description: "Encourage creative thinking and unconventional approaches to solving problems.",
        icon: "lightbulb"
      },
      {
        number: "02",
        title: "COLLABORATE BOLDLY",
        description: "Build multidisciplinary teams and encourage knowledge sharing.",
        icon: "users"
      },
      {
        number: "03",
        title: "BUILD IMPACTFULLY",
        description: "Transform ideas into practical and meaningful solutions.",
        icon: "trending-up"
      },
      {
        number: "04",
        title: "LEAD FEARLESSLY",
        description: "Develop confident student leaders who can create and drive change.",
        icon: "award"
      }
    ]
  },

  mission: {
    heading: "OUR MISSION",
    points: [
      {
        number: "01",
        title: "PROVIDE A COLLABORATIVE PLATFORM",
        description: "Provide a collaborative platform for students to explore entrepreneurship, develop innovations, and build real-world solutions.",
        icon: "users-group",
        badge: "COLLABORATE",
        subtext: "Share ideas. Create together."
      },
      {
        number: "02",
        title: "BRIDGE THE GAP",
        description: "Bridge the gap between academic learning and industry demands through hands-on projects, mentorship and practical experiences.",
        icon: "briefcase",
        badge: "EMPOWER",
        subtext: "Gain skills. Shape the future."
      },
      {
        number: "03",
        title: "FOSTER A CULTURE OF INNOVATION",
        description: "Foster a culture of ideation, experimentation, and fearless execution among student innovators.",
        icon: "zap",
        badge: "INNOVATE",
        subtext: "Think different. Build solutions."
      }
    ],
    callouts: [
      { label: "COLLABORATE", desc: "Share ideas. Create together.", icon: "users" },
      { label: "INNOVATE", desc: "Think different. Build solutions.", icon: "lightbulb" },
      { label: "EMPOWER", desc: "Gain skills. Shape the future.", icon: "rocket" },
      { label: "IMPACT", desc: "Drive change. Make an impact.", icon: "bar-chart" }
    ]
  },

  aboutPillars: [
    {
      title: "INNOVATION",
      desc: "Encouraging students to think differently and create meaningful solutions.",
      icon: "lightbulb"
    },
    {
      title: "ENTREPRENEURSHIP",
      desc: "Helping students understand entrepreneurship and turn ideas into opportunities.",
      icon: "trending-up"
    },
    {
      title: "COLLABORATION",
      desc: "Connecting students across departments to build diverse and multidisciplinary teams.",
      icon: "users"
    },
    {
      title: "IMPACT",
      desc: "Transforming ideas into practical solutions that create meaningful value.",
      icon: "target"
    }
  ],

  whatWeDo: [
    {
      id: "ideation",
      title: "IDEATION",
      desc: "Helping students identify problems and generate innovative ideas.",
      icon: "compass"
    },
    {
      id: "skill-development",
      title: "SKILL DEVELOPMENT",
      desc: "Conducting workshops and practical learning sessions.",
      icon: "cpu"
    },
    {
      id: "mentorship",
      title: "MENTORSHIP",
      desc: "Connecting students with innovators, entrepreneurs and experts.",
      icon: "user-check"
    },
    {
      id: "hackathons",
      title: "HACKATHONS",
      desc: "Encouraging students to solve real-world problems through collaborative challenges.",
      icon: "terminal"
    },
    {
      id: "ip-innovation",
      title: "IP & INNOVATION",
      desc: "Introducing students to intellectual property, innovation protection and commercialization.",
      icon: "shield-check"
    },
    {
      id: "showcase",
      title: "SHOWCASE",
      desc: "Providing opportunities to demonstrate innovative solutions and projects.",
      icon: "presentation"
    }
  ],

  activities: [
    {
      id: "act-1",
      category: "Workshop",
      badge: "Flagship Workshop",
      title: "Awareness Workshop: Entrepreneurship & Innovation as Career Opportunities",
      shortDesc: "An awareness session introducing students to entrepreneurship and innovation as potential career paths and encouraging them to explore opportunities beyond conventional career routes.",
      purpose: "To inspire and educate undergraduate and postgraduate students about entrepreneurial pathways, startup opportunities, and innovation-driven value creation.",
      keyOutcomes: [
        "Student awareness on modern startup ecosystems",
        "Idea generation & opportunity recognition",
        "Entrepreneurial exposure and career clarity"
      ],
      keyActivities: [
        "Keynote address by seasoned startup mentors",
        "Case studies on student-founded enterprises",
        "Interactive Q&A on venture funding and incubation"
      ],
      targetParticipants: "All Students across Engineering, Management, Science & Arts",
      dateStatus: "Upcoming • Date to be announced",
      icon: "briefcase"
    },
    {
      id: "act-2",
      category: "Expert Session",
      badge: "Speaker Series",
      title: "My Story / Motivational Expert Sessions",
      shortDesc: "Interactive sessions featuring successful innovators, entrepreneurs and industry professionals who share their personal journeys, challenges, failures, lessons and achievements.",
      purpose: "To inspire students through real-world experiences and entrepreneurial stories, offering candid insights into grit, pivoting, and resilience.",
      keyOutcomes: [
        "Firsthand understanding of startup life cycles",
        "Learning from real-world failures and breakthroughs",
        "Direct networking with established founders"
      ],
      keyActivities: [
        "Fireside chat with prominent startup founder",
        "Unfiltered story of founder's journey and pivots",
        "Direct interactive AMA (Ask Me Anything) session"
      ],
      targetParticipants: "Aspiring student entrepreneurs and all club members",
      dateStatus: "Upcoming • Date to be announced",
      icon: "message-square"
    },
    {
      id: "act-3",
      category: "Bootcamp",
      badge: "Hands-on Sprint",
      title: "Boot Camp on Problem Solving / Ideation",
      shortDesc: "A hands-on boot camp designed to develop structured problem-solving, creative thinking and ideation skills through team-based sprints.",
      purpose: "Students will identify problems, generate ideas and work collaboratively toward possible solutions using proven design thinking methodologies.",
      keyOutcomes: [
        "Mastery of structured Design Thinking frameworks",
        "Real-world root cause analysis techniques",
        "Collaborative multidisciplinary problem formulation"
      ],
      keyActivities: [
        "Design Thinking empathy mapping workshops",
        "Crazy 8s ideation and solution sketching drills",
        "Lightning feedback rounds with mentor review"
      ],
      targetParticipants: "Students interested in product design, innovation & development",
      dateStatus: "Upcoming • Date to be announced",
      icon: "zap"
    },
    {
      id: "act-4",
      category: "Workshop",
      badge: "Tech & Innovation",
      title: "Workshop on AI and Industry 4.0 Tools for Innovators and Entrepreneurs",
      shortDesc: "An awareness and skill-development workshop introducing students to Artificial Intelligence and Industry 4.0 technologies and their applications in innovation and entrepreneurship.",
      purpose: "To equip students with modern AI tools, automation platforms, and smart engineering practices to build scalable products rapidly.",
      keyOutcomes: [
        "Practical understanding of AI in modern businesses",
        "Hands-on experience with no-code and AI prototyping",
        "Familiarity with Industry 4.0 automation paradigms"
      ],
      keyActivities: [
        "Live demonstrations of generative AI & automation stacks",
        "Industry 4.0 integration for hardware and software",
        "Rapid prototyping lab session"
      ],
      targetParticipants: "Tech enthusiasts, coders, makers, and innovators",
      dateStatus: "Upcoming • Date to be announced",
      icon: "cpu"
    },
    {
      id: "act-5",
      category: "Legal & IP",
      badge: "Essential Knowledge",
      title: "IPR Basics for Innovators & Entrepreneurs",
      shortDesc: "An introductory session explaining intellectual property rights (IPR) and its paramount importance for safeguarding technological and business innovations.",
      purpose: "Students will learn the core fundamentals of patents, copyrights, trademarks, and design rights, enabling them to protect innovative ideas and understand commercialization.",
      keyOutcomes: [
        "Clear distinction between Patents, Trademarks & Copyrights",
        "Filing roadmap and documentation best practices",
        "Strategies for commercializing intellectual property"
      ],
      keyActivities: [
        "Guest lecture by Registered Patent Attorney",
        "Patent search walkthrough on public databases",
        "Evaluation of patentable student projects"
      ],
      targetParticipants: "Student researchers, project builders, and innovators",
      dateStatus: "Upcoming • Date to be announced",
      icon: "shield"
    },
    {
      id: "act-6",
      category: "Strategy",
      badge: "Validation Masterclass",
      title: "Session on Achieving Problem-Solution Fit",
      shortDesc: "A focused session helping students understand how to validate whether their proposed solution actually addresses a real and meaningful problem in the market.",
      purpose: "To prevent building solutions in search of problems by enforcing customer discovery, validation experiments, and iterative refinement.",
      keyOutcomes: [
        "Customer discovery interview methodologies",
        "Creating minimal viable value propositions",
        "Iterative feedback loops and decision metrics"
      ],
      keyActivities: [
        "User persona creation & hypothesis formulation",
        "Simulated user interview roleplay exercises",
        "Value proposition canvas workshop"
      ],
      targetParticipants: "Project teams, hackathon enthusiasts, and club members",
      dateStatus: "Upcoming • Date to be announced",
      icon: "check-circle"
    },
    {
      id: "act-7",
      category: "Hackathon",
      badge: "Competitive Sprint",
      title: "Inter / Intra Institutional Hackathon / Idea Challenge",
      shortDesc: "A competitive innovation challenge where students collaborate in teams to solve real-world problems and present their ideas or prototypes to expert panels.",
      purpose: "To stimulate cross-departmental collaboration, intensive prototyping, and pitch readiness in a high-energy competitive environment.",
      keyOutcomes: [
        "Working functional prototype developed within time limit",
        "Real-time technical problem solving under constraints",
        "Recognition, awards, and incubation fast-track"
      ],
      keyActivities: [
        "Problem statement reveal and team formation",
        "Mentor checkpoint reviews throughout the sprint",
        "Live grand jury pitch showcase & prize ceremony"
      ],
      targetParticipants: "Multidisciplinary student teams across all years and departments",
      dateStatus: "Upcoming • Date to be announced",
      icon: "code"
    },
    {
      id: "act-8",
      category: "Showcase",
      badge: "Culmination Event",
      title: "Demo Day / Idea Showcase",
      shortDesc: "A prestigious platform where students showcase innovative ideas, projects, prototypes and solutions to mentors, faculty, industry experts, and potential incubators.",
      purpose: "To celebrate student achievement, obtain critical feedback, secure institutional incubation support, and bridge student talent to the industry.",
      keyOutcomes: [
        "Formal public demonstration of student projects",
        "Evaluation and feedback from industry leaders & faculty",
        "Incubation grants, seed funding opportunities & mentorship"
      ],
      keyActivities: [
        "Project booth demonstrations & public walkthroughs",
        "Pitch presentation before a panel of angel investors and professors",
        "Awarding of Innovation Excellence badges"
      ],
      targetParticipants: "All shortlisted student innovators and project teams",
      dateStatus: "Upcoming • Date to be announced",
      icon: "award"
    }
  ],

  celebrations: [
    {
      id: "cel-1",
      title: "Institution's Innovation Day",
      tagline: "Celebrating student creativity and breakthrough ideas",
      desc: "A celebration of innovation and creativity that highlights student ideas, projects, prototypes and technical achievements across the institution.",
      dateDisplay: "Upcoming • Date to be announced",
      badge: "Institutional Milestone",
      icon: "sparkles",
      highlights: ["Campus Innovation Exhibition", "Project Competitions", "Honorary Keynote Address"]
    },
    {
      id: "cel-2",
      title: "National Entrepreneurship Day",
      tagline: "Inspiring the next generation of job creators and founders",
      desc: "An initiative to create widespread awareness about entrepreneurship, startups, venture building, and entrepreneurial opportunities available to young students.",
      dateDisplay: "Upcoming • Date to be announced",
      badge: "National Observance",
      icon: "flag",
      highlights: ["Startup Pitch Battle", "Panel on Venture Capital", "Student Founder Spotlights"]
    },
    {
      id: "cel-3",
      title: "National Education Day",
      tagline: "Honoring knowledge, innovation, and holistic student growth",
      desc: "An activity celebrating the importance of education, multidisciplinary learning, innovation, and the role of progressive education in shaping future technology leaders.",
      dateDisplay: "Upcoming • Date to be announced",
      badge: "National Observance",
      icon: "book-open",
      highlights: ["Open Ideation Roundtables", "Interdisciplinary Hack Challenge", "Academic-Industry Exchange"]
    }
  ],

  journeySteps: [
    {
      number: "01",
      title: "IDENTIFY",
      subtitle: "Find a Real Problem",
      desc: "Scout real-world community and industry challenges. Conduct observation and root-cause analysis.",
      icon: "search"
    },
    {
      number: "02",
      title: "IDEATE",
      subtitle: "Generate Solutions",
      desc: "Brainstorm creative, unconventional ideas using design thinking frameworks and multidisciplinary views.",
      icon: "lightbulb"
    },
    {
      number: "03",
      title: "VALIDATE",
      subtitle: "Test Assumptions",
      desc: "Engage target users, gather real feedback, and verify problem-solution fit before writing a line of code.",
      icon: "check-circle-2"
    },
    {
      number: "04",
      title: "BUILD",
      subtitle: "Develop Prototype",
      desc: "Engineer a minimum viable prototype (MVP) leveraging modern software, hardware, and AI tools.",
      icon: "hammer"
    },
    {
      number: "05",
      title: "SHOWCASE",
      subtitle: "Pitch to Stakeholders",
      desc: "Present your prototype before mentors, faculty panels, and industry leaders at Demo Days and Hackathons.",
      icon: "presentation"
    },
    {
      number: "06",
      title: "IMPACT",
      subtitle: "Drive Real Change",
      desc: "Translate validated prototypes into deployable solutions, publications, patents, or student startups.",
      icon: "globe"
    }
  ],

  stats: [
    {
      value: "500+",
      label: "Students Engaged",
      subtext: "Across multiple departments and academic years",
      icon: "users"
    },
    {
      value: "32+",
      label: "Innovation Sessions",
      subtext: "Workshops, boot camps, and expert masterclasses",
      icon: "calendar"
    },
    {
      value: "100+",
      label: "Ideas Developed",
      subtext: "Structured problem statements & solutions",
      icon: "lightbulb"
    },
    {
      value: "40+",
      label: "Projects Showcased",
      subtext: "Functional prototypes & exhibition displays",
      icon: "rocket"
    }
  ],

  teamCategories: [
    "All",
    "Faculty",
    "Leadership",
    "Core Team"
  ],

  team: [
    {
      name: "Professor Latha",
      role: "Faculty Coordinator",
      category: "Faculty",
      department: "Meenakshi Sundararajan Engineering College",
      bio: "Guiding institutional innovation initiatives, mentoring student ventures, and fostering research-driven entrepreneurship.",
      tag: "Faculty Advisory",
      initials: "PL"
    },
    {
      name: "Professor Aarthi",
      role: "Faculty Coordinator",
      category: "Faculty",
      department: "Meenakshi Sundararajan Engineering College",
      bio: "Mentoring student innovators, bridging academic learning with industry demands, and curating expert sessions.",
      tag: "Faculty Advisory",
      initials: "PA"
    },
    {
      name: "Professor Siji",
      role: "Faculty Coordinator",
      category: "Faculty",
      department: "Meenakshi Sundararajan Engineering College",
      bio: "Facilitating multidisciplinary project collaboration, entrepreneurial workshops, and campus incubation support.",
      tag: "Faculty Advisory",
      initials: "PS"
    },
    {
      name: "Harshitha",
      role: "President",
      category: "Leadership",
      department: "Meenakshi Sundararajan Engineering College",
      bio: "Spearheading EDI Club's strategic roadmap, flagship initiatives, and cultivating an inclusive campus innovation culture.",
      tag: "Executive Board",
      initials: "H"
    },
    {
      name: "Sparsha",
      role: "Vice President",
      category: "Leadership",
      department: "Meenakshi Sundararajan Engineering College",
      bio: "Driving cross-departmental collaboration, program execution, and student engagement across club activities.",
      tag: "Executive Board",
      initials: "SP"
    },
    {
      name: "Narendrapalani Kauppaih",
      role: "Vice President",
      category: "Leadership",
      department: "Meenakshi Sundararajan Engineering College",
      bio: "Leading strategic outreach, technical sprints, and empowering student teams to build scalable solutions.",
      tag: "Executive Board",
      initials: "NK"
    },
    {
      name: "Dinesh",
      role: "Secretary",
      category: "Core Team",
      department: "Meenakshi Sundararajan Engineering College",
      bio: "Managing institutional coordination, calendar planning, event operations, and documentation workflows.",
      tag: "Core Team",
      initials: "D"
    },
    {
      name: "Gothavari",
      role: "Joint Secretary",
      category: "Core Team",
      department: "Meenakshi Sundararajan Engineering College",
      bio: "Supporting club operations, inter-department communications, and student activity coordination.",
      tag: "Core Team",
      initials: "G"
    },
    {
      name: "Aamina",
      role: "Treasurer",
      category: "Core Team",
      department: "Meenakshi Sundararajan Engineering College",
      bio: "Overseeing financial planning, resource allocation, and budget administration for all club initiatives.",
      tag: "Core Team",
      initials: "A"
    },
    {
      name: "Tanya",
      role: "Joint Treasurer",
      category: "Core Team",
      department: "Meenakshi Sundararajan Engineering College",
      bio: "Assisting in financial reporting, event budget tracking, and material logistics management.",
      tag: "Core Team",
      initials: "T"
    }
  ],

  galleryCategories: [
    "All",
    "Inauguration",
    "Expert Sessions",
    "Ideation & Showcases",
    "Pillars & Vision"
  ],

  gallery: [
    {
      id: "gal-1",
      category: "Inauguration",
      title: "EDI Club Grand Inauguration Ceremony",
      subtitle: "Faculty coordinators Professor Latha, Professor Aarthi, Professor Siji, and chief guests on dais at Meenakshi Sundararajan Engineering College",
      tag: "Club Inauguration",
      image: "images/inauguration_dignitaries.jpg",
      badge: "Historic Milestone"
    },
    {
      id: "gal-2",
      category: "Expert Sessions",
      title: "Inaugural Keynote Address & Motivational Session",
      subtitle: "Chief guest delivering an inspiring keynote on entrepreneurial thinking to students and faculty in the auditorium",
      tag: "Keynote Session",
      image: "images/inauguration_keynote.jpg",
      badge: "Expert Address"
    },
    {
      id: "gal-3",
      category: "Ideation & Showcases",
      title: "Student Ideation & Project Presentation",
      subtitle: "Students presenting their innovative project 'One Roof, Many Generations' during the campus ideation review at MSEC",
      tag: "Live Event",
      image: "images/event_ideation_pitch.jpg",
      badge: "Problem Solving"
    },
    {
      id: "gal-4",
      category: "Pillars & Vision",
      title: "EDI Club Vision Architecture",
      subtitle: "Official vision artwork defining our commitment to entrepreneurial thinkers, innovators, and future tech leaders",
      tag: "Vision Artwork",
      image: "images/vision_poster.jpg",
      badge: "Strategic Vision"
    },
    {
      id: "gal-5",
      category: "Pillars & Vision",
      title: "EDI Club Mission Framework",
      subtitle: "Official mission artwork detailing our collaborative platform, industry bridging, and innovation culture",
      tag: "Mission Framework",
      image: "images/mission_poster.jpg",
      badge: "Action Roadmap"
    },
    {
      id: "gal-6",
      category: "Inauguration",
      title: "Executive Student Board & Organizing Team",
      subtitle: "Student leadership team coordinating the successful inaugural launch of EDI Club at MSEC",
      tag: "Leadership",
      image: "images/inauguration_keynote.jpg",
      badge: "Organizing Team"
    }
  ],

  whyJoin: [
    {
      title: "LEARN",
      desc: "Gain exposure to entrepreneurship, innovation and emerging technologies through guided mentorship and hands-on masterclasses.",
      icon: "book-open"
    },
    {
      title: "BUILD",
      desc: "Develop practical skills through real-world projects, maker activities, rapid prototyping challenges, and team hackathons.",
      icon: "wrench"
    },
    {
      title: "CONNECT",
      desc: "Meet like-minded peers, experienced faculty mentors, successful entrepreneurs, and visiting industry professionals.",
      icon: "network"
    },
    {
      title: "LEAD",
      desc: "Develop leadership, public communication, event curation, and multidisciplinary teamwork skills that set you apart.",
      icon: "shield-alert"
    },
    {
      title: "CREATE",
      desc: "Turn raw ideas into viable solutions that solve real community problems and create measurable economic and social value.",
      icon: "sparkles"
    }
  ]
};
