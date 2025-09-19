// Demo timetable data service for student and faculty dashboards

// Helper functions for generating session-specific content
const getSessionTopics = (courseCode, classType, sessionNumber) => {
  const topicsMap = {
    CS201: {
      Lecture: [
        `Arrays and Pointers`,
        `Linked Lists`,
        `Stacks and Queues`,
        `Trees`,
        `Graphs`,
        `Hash Tables`,
        `Sorting Algorithms`,
        `Searching Algorithms`,
      ],
      Lab: [
        `Array Implementation`,
        `Linked List Lab`,
        `Stack/Queue Lab`,
        `Tree Traversal`,
        `Graph Algorithms`,
        `Hash Table Lab`,
        `Sorting Lab`,
        `Search Lab`,
      ],
      Tutorial: [
        `Problem Solving`,
        `Code Review`,
        `Algorithm Analysis`,
        `Data Structure Design`,
        `Performance Optimization`,
        `Debugging`,
        `Best Practices`,
        `Project Work`,
      ],
    },
    CS301: {
      Lecture: [
        `Database Concepts`,
        `ER Modeling`,
        `Relational Model`,
        `SQL Basics`,
        `Advanced SQL`,
        `Normalization`,
        `Transactions`,
        `Indexing`,
      ],
      Lab: [
        `Database Setup`,
        `ER Diagram Lab`,
        `Table Creation`,
        `Basic Queries`,
        `Complex Queries`,
        `Database Design`,
        `Transaction Lab`,
        `Performance Lab`,
      ],
      Tutorial: [
        `Design Patterns`,
        `Query Optimization`,
        `Case Studies`,
        `Project Planning`,
        `Database Administration`,
        `Backup & Recovery`,
        `Security`,
        `Final Project`,
      ],
    },
    CS302: {
      Lecture: [
        `Network Basics`,
        `OSI Model`,
        `TCP/IP`,
        `Routing`,
        `Network Security`,
        `Wireless Networks`,
        `Web Technologies`,
        `Network Management`,
      ],
      Lab: [
        `Network Setup`,
        `Protocol Analysis`,
        `TCP/IP Lab`,
        `Routing Lab`,
        `Security Lab`,
        `Wireless Lab`,
        `Web Server Setup`,
        `Network Monitoring`,
      ],
      Tutorial: [
        `Network Design`,
        `Troubleshooting`,
        `Security Analysis`,
        `Performance Testing`,
        `Protocol Implementation`,
        `Network Projects`,
        `Case Studies`,
        `Industry Trends`,
      ],
    },
    CS303: {
      Lecture: [
        `SDLC Models`,
        `Requirements Analysis`,
        `System Design`,
        `Implementation`,
        `Testing`,
        `Deployment`,
        `Maintenance`,
        `Project Management`,
      ],
      Lab: [
        `Tool Setup`,
        `Requirements Lab`,
        `Design Lab`,
        `Coding Standards`,
        `Testing Lab`,
        `Version Control`,
        `Deployment Lab`,
        `Project Demo`,
      ],
      Tutorial: [
        `Team Formation`,
        `Project Planning`,
        `Design Reviews`,
        `Code Reviews`,
        `Testing Strategies`,
        `Documentation`,
        `Presentation Skills`,
        `Final Presentation`,
      ],
    },
    CS401: {
      Lecture: [
        `ML Introduction`,
        `Linear Regression`,
        `Classification`,
        `Neural Networks`,
        `Deep Learning`,
        `Clustering`,
        `Reinforcement Learning`,
        `AI Applications`,
      ],
      Lab: [
        `Python Setup`,
        `Data Preprocessing`,
        `Regression Lab`,
        `Classification Lab`,
        `Neural Network Lab`,
        `Deep Learning Lab`,
        `Clustering Lab`,
        `AI Project`,
      ],
      Tutorial: [
        `Research Methods`,
        `Paper Reviews`,
        `Model Evaluation`,
        `Feature Engineering`,
        `Hyperparameter Tuning`,
        `Model Deployment`,
        `Ethics in AI`,
        `Research Presentation`,
      ],
    },
    CS304: {
      Lecture: [
        `Web Basics`,
        `HTML/CSS`,
        `JavaScript`,
        `Frontend Frameworks`,
        `Backend Development`,
        `Databases`,
        `APIs`,
        `Deployment`,
      ],
      Lab: [
        `Environment Setup`,
        `HTML/CSS Lab`,
        `JavaScript Lab`,
        `React Lab`,
        `Node.js Lab`,
        `Database Integration`,
        `API Development`,
        `Full Stack Project`,
      ],
      Tutorial: [
        `Design Principles`,
        `Code Reviews`,
        `Debugging`,
        `Performance Optimization`,
        `Security Best Practices`,
        `Testing`,
        `DevOps`,
        `Portfolio Review`,
      ],
    },
    CS305: {
      Lecture: [
        `OS Introduction`,
        `Process Management`,
        `Memory Management`,
        `File Systems`,
        `I/O Systems`,
        `Synchronization`,
        `Deadlocks`,
        `Security`,
      ],
      Lab: [
        `System Calls`,
        `Process Lab`,
        `Memory Lab`,
        `File System Lab`,
        `I/O Lab`,
        `Threading Lab`,
        `IPC Lab`,
        `System Programming`,
      ],
      Tutorial: [
        `OS Design`,
        `Performance Analysis`,
        `System Administration`,
        `Kernel Programming`,
        `Device Drivers`,
        `System Security`,
        `Virtualization`,
        `Cloud Computing`,
      ],
    },
  };

  const topics = topicsMap[courseCode]?.[classType] || [
    `Session ${sessionNumber} Topic`,
  ];
  return topics[sessionNumber - 1] || `Advanced ${classType} Session`;
};

const getSessionAssignments = (courseCode, sessionNumber) => {
  const assignments = [
    `Assignment ${sessionNumber}: ${courseCode} Problems`,
    `Lab Report ${sessionNumber}`,
    `Reading Assignment: Chapter ${sessionNumber}`,
    `Project Milestone ${Math.ceil(sessionNumber / 2)}`,
    `Quiz Preparation`,
    `Presentation Preparation`,
    `Research Task ${sessionNumber}`,
    `Practice Problems Set ${sessionNumber}`,
  ];
  return sessionNumber <= 8 ? [assignments[sessionNumber - 1]] : [];
};

const getSessionResources = (courseCode) => {
  const resourcesMap = {
    CS201: [
      `GeeksforGeeks Data Structures`,
      `LeetCode Practice`,
      `YouTube: Data Structures`,
      `GitHub Code Examples`,
    ],
    CS301: [
      `W3Schools SQL`,
      `MySQL Documentation`,
      `Database Design Tools`,
      `SQL Practice Platforms`,
    ],
    CS302: [
      `Cisco Networking Academy`,
      `Wireshark Tutorials`,
      `Network Simulator Tools`,
      `RFC Documents`,
    ],
    CS303: [
      `Agile Alliance Resources`,
      `GitHub for Version Control`,
      `Project Management Tools`,
      `UML Diagrams`,
    ],
    CS401: [
      `Kaggle Datasets`,
      `TensorFlow Tutorials`,
      `Coursera ML Course`,
      `Research Papers`,
    ],
    CS304: [
      `MDN Web Docs`,
      `React Documentation`,
      `Node.js Guides`,
      `Deployment Platforms`,
    ],
    CS305: [
      `Linux Documentation`,
      `System Programming Books`,
      `Kernel Source Code`,
      `Virtual Machines`,
    ],
  };
  return (
    resourcesMap[courseCode] || [
      `Course Materials`,
      `Online Resources`,
      `Reference Books`,
      `Practice Platforms`,
    ]
  );
};

const getRequiredEquipment = (sessionType) => {
  const equipmentMap = {
    Lab: [
      `Computers`,
      `Projector`,
      `Whiteboard`,
      `Lab Software`,
      `Network Access`,
    ],
    Lecture: [
      `Projector`,
      `Microphone`,
      `Whiteboard`,
      `Lecture Capture System`,
    ],
    Tutorial: [`Whiteboard`, `Projector`, `Discussion Tables`, `Flipchart`],
    "Research Seminar": [
      `Projector`,
      `Conference System`,
      `Recording Equipment`,
    ],
    "One-on-One Guidance": [`Computer`, `Research Papers`, `Writing Tools`],
  };
  return equipmentMap[sessionType] || [`Basic Classroom Setup`];
};

const getRequiredMaterials = (courseCode) => {
  const materialsMap = {
    CS201: [
      `Textbook`,
      `Programming IDE`,
      `Algorithm Visualizer`,
      `Practice Problems`,
    ],
    CS301: [
      `Database Software`,
      `SQL Reference`,
      `Sample Databases`,
      `Design Tools`,
    ],
    CS302: [
      `Network Simulator`,
      `Protocol Analyzers`,
      `Router Configuration Guide`,
      `Security Tools`,
    ],
    CS303: [
      `Project Management Tools`,
      `UML Software`,
      `Version Control`,
      `Documentation Templates`,
    ],
    CS401: [
      `Python/R Environment`,
      `ML Libraries`,
      `Dataset Collections`,
      `Research Papers`,
    ],
    CS304: [
      `Code Editor`,
      `Browser Dev Tools`,
      `Framework Documentation`,
      `Design Resources`,
    ],
    CS305: [
      `Virtual Machines`,
      `System Programming Tools`,
      `OS Source Code`,
      `Debugging Tools`,
    ],
    RG001: [
      `Research Methodology Books`,
      `Academic Databases`,
      `Statistical Software`,
      `Writing Tools`,
    ],
    SEM01: [
      `Presentation Tools`,
      `Technical Journals`,
      `Industry Reports`,
      `Recording Equipment`,
    ],
  };
  return (
    materialsMap[courseCode] || [
      `Course Handouts`,
      `Reference Materials`,
      `Online Resources`,
    ]
  );
};

export const generateDemoStudentTimetable = () => {
  const timeSlots = [
    "08:30-09:30",
    "09:30-10:30",
    "10:45-11:45",
    "11:45-12:45",
    "12:45-13:45", // Lunch Break
    "13:45-14:45",
    "14:45-15:45",
    "16:00-17:00",
    "17:00-18:00",
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const subjects = [
    {
      name: "Data Structures & Algorithms",
      code: "CS201",
      instructor: "Dr. Sarah Smith",
      instructorEmail: "s.smith@university.edu",
      room: "Computer Lab-A",
      building: "Engineering Block",
      floor: "2nd Floor",
      capacity: 45,
      credits: 4,
      department: "Computer Science",
      prerequisites: ["CS101", "MATH201"],
      description:
        "Advanced data structures, algorithms analysis, and implementation techniques",
      learningOutcomes: [
        "Implement complex data structures",
        "Analyze algorithm complexity",
        "Design efficient algorithms",
      ],
      assessmentMethods: [
        "Assignments (40%)",
        "Lab Tests (30%)",
        "Final Exam (30%)",
      ],
      textbook: "Introduction to Algorithms by Cormen",
      category: "Core Subject",
      currentProgress: "75% Complete",
      nextDeadline: "Assignment 3 - Sept 20, 2025",
      labEquipment: ["High-spec PCs", "Dev Tools", "Compilers"],
      skillsGained: [
        "Algorithm Design",
        "Problem Solving",
        "Code Optimization",
      ],
    },
    {
      name: "Database Management Systems",
      code: "CS301",
      instructor: "Prof. Michael Johnson",
      instructorEmail: "m.johnson@university.edu",
      room: "Database Lab-101",
      building: "IT Block",
      floor: "1st Floor",
      capacity: 40,
      credits: 3,
      department: "Computer Science",
      prerequisites: ["CS201", "CS202"],
      description:
        "Database design, SQL, normalization, and database administration",
      learningOutcomes: [
        "Design normalized databases",
        "Write complex SQL queries",
        "Understand transaction management",
      ],
      assessmentMethods: [
        "Project (50%)",
        "Mid-term (25%)",
        "Final Exam (25%)",
      ],
      textbook: "Database System Concepts by Silberschatz",
      category: "Core Subject",
      currentProgress: "60% Complete",
      nextDeadline: "Database Project - Sept 25, 2025",
      labEquipment: ["MySQL Servers", "Oracle DB", "MongoDB"],
      skillsGained: ["SQL Mastery", "Database Design", "Data Modeling"],
    },
    {
      name: "Computer Networks & Security",
      code: "CS302",
      instructor: "Dr. Robert Brown",
      instructorEmail: "r.brown@university.edu",
      room: "Network Lab-102",
      building: "Engineering Block",
      floor: "3rd Floor",
      capacity: 35,
      credits: 4,
      department: "Computer Science",
      prerequisites: ["CS201", "MATH301"],
      description:
        "Network protocols, security mechanisms, and distributed systems",
      learningOutcomes: [
        "Understand network protocols",
        "Implement security measures",
        "Design network architectures",
      ],
      assessmentMethods: [
        "Lab Work (40%)",
        "Assignments (30%)",
        "Final Exam (30%)",
      ],
      textbook: "Computer Networking by Kurose and Ross",
      category: "Core Subject",
      currentProgress: "80% Complete",
      nextDeadline: "Network Security Lab - Sept 18, 2025",
      labEquipment: ["Cisco Routers", "Switches", "Security Tools"],
      skillsGained: [
        "Network Configuration",
        "Security Analysis",
        "Protocol Design",
      ],
    },
    {
      name: "Software Engineering & Project Management",
      code: "CS303",
      instructor: "Prof. Jennifer Davis",
      instructorEmail: "j.davis@university.edu",
      room: "Seminar Room-103",
      building: "IT Block",
      floor: "2nd Floor",
      capacity: 50,
      credits: 3,
      department: "Computer Science",
      prerequisites: ["CS201", "CS202"],
      description:
        "Software development lifecycle, project management, and team collaboration",
      learningOutcomes: [
        "Manage software projects",
        "Apply agile methodologies",
        "Lead development teams",
      ],
      assessmentMethods: [
        "Team Project (60%)",
        "Presentations (20%)",
        "Final Exam (20%)",
      ],
      textbook: "Software Engineering by Sommerville",
      category: "Core Subject",
      currentProgress: "65% Complete",
      nextDeadline: "Sprint Demo - Sept 22, 2025",
      labEquipment: [
        "Project Tools",
        "Collaboration Software",
        "Version Control",
      ],
      skillsGained: ["Project Management", "Team Leadership", "Agile Methods"],
    },
    {
      name: "Machine Learning & AI",
      code: "CS401",
      instructor: "Dr. Alex Wilson",
      instructorEmail: "a.wilson@university.edu",
      room: "AI Lab-201",
      building: "Research Block",
      floor: "2nd Floor",
      capacity: 30,
      credits: 4,
      department: "Computer Science",
      prerequisites: ["CS301", "MATH401", "STAT301"],
      description:
        "Introduction to machine learning algorithms, neural networks, and AI applications",
      learningOutcomes: [
        "Implement ML algorithms",
        "Build neural networks",
        "Solve real-world AI problems",
      ],
      assessmentMethods: [
        "Projects (50%)",
        "Assignments (30%)",
        "Final Exam (20%)",
      ],
      textbook: "Pattern Recognition and Machine Learning by Bishop",
      category: "Elective Subject",
      currentProgress: "45% Complete",
      nextDeadline: "ML Project Proposal - Sept 28, 2025",
      labEquipment: ["GPU Workstations", "Python/R", "TensorFlow", "PyTorch"],
      skillsGained: ["Data Analysis", "Model Building", "Deep Learning"],
    },
    {
      name: "Web Development & Cloud Computing",
      code: "CS304",
      instructor: "Ms. Lisa Garcia",
      instructorEmail: "l.garcia@university.edu",
      room: "Web Lab-105",
      building: "IT Block",
      floor: "2nd Floor",
      capacity: 50,
      credits: 3,
      department: "Computer Science",
      prerequisites: ["CS202", "CS250"],
      description:
        "Software development lifecycle, project management, and team collaboration",
      learningOutcomes: [
        "Apply SDLC methodologies",
        "Manage software projects",
        "Work in development teams",
      ],
      assessmentMethods: [
        "Group Project (60%)",
        "Presentations (20%)",
        "Final Exam (20%)",
      ],
      textbook: "Software Engineering by Sommerville",
      category: "Core Subject",
    },
    {
      name: "Machine Learning & AI",
      code: "CS401",
      instructor: "Dr. Emily Wilson",
      instructorEmail: "e.wilson@university.edu",
      room: "AI Lab-B",
      building: "Research Block",
      floor: "1st Floor",
      capacity: 30,
      credits: 4,
      department: "Computer Science",
      prerequisites: ["CS301", "MATH401", "STAT301"],
      description:
        "Machine learning algorithms, neural networks, and artificial intelligence applications",
      learningOutcomes: [
        "Implement ML algorithms",
        "Design neural networks",
        "Evaluate model performance",
      ],
      assessmentMethods: [
        "Research Project (50%)",
        "Assignments (30%)",
        "Final Exam (20%)",
      ],
      textbook: "Pattern Recognition and Machine Learning by Bishop",
      category: "Elective Subject",
    },
    {
      name: "Full-Stack Web Development",
      code: "CS304",
      instructor: "Prof. Carlos Garcia",
      instructorEmail: "c.garcia@university.edu",
      room: "Web Dev Lab-C",
      building: "IT Block",
      floor: "3rd Floor",
      capacity: 25,
      credits: 3,
      department: "Computer Science",
      prerequisites: ["CS201", "CS250"],
      description:
        "Modern web technologies, frameworks, and full-stack application development",
      learningOutcomes: [
        "Build responsive web applications",
        "Use modern frameworks",
        "Deploy web applications",
      ],
      assessmentMethods: [
        "Portfolio Project (70%)",
        "Mid-term (15%)",
        "Final Exam (15%)",
      ],
      textbook: "Learning Web Design by Robbins",
      category: "Elective Subject",
    },
    {
      name: "Operating Systems & System Programming",
      code: "CS305",
      instructor: "Dr. David Miller",
      instructorEmail: "d.miller@university.edu",
      room: "Systems Lab-104",
      building: "Engineering Block",
      floor: "1st Floor",
      capacity: 40,
      credits: 4,
      department: "Computer Science",
      prerequisites: ["CS201", "CS250"],
      description:
        "Operating system concepts, system calls, process management, and memory management",
      learningOutcomes: [
        "Understand OS architecture",
        "Implement system programs",
        "Analyze system performance",
      ],
      assessmentMethods: [
        "Lab Assignments (45%)",
        "Mid-term (25%)",
        "Final Exam (30%)",
      ],
      textbook: "Operating System Concepts by Galvin",
      category: "Core Subject",
    },
  ];

  const timetable = {};

  days.forEach((day) => {
    timetable[day] = {};
    timeSlots.forEach((slot, index) => {
      // Add some randomness but ensure consistency for demo
      const subjectIndex =
        (days.indexOf(day) * timeSlots.length + index) % subjects.length;
      const subject = subjects[subjectIndex];

      // Special weekly events
      const isSpecialEvent =
        (day === "Wednesday" && slot === "17:00-18:00") ||
        (day === "Thursday" && slot === "16:00-17:00") ||
        (day === "Friday" && slot === "13:45-14:45");

      // Skip some slots to make it realistic (lunch break, free periods)
      if (slot === "12:45-13:45") {
        timetable[day][slot] = {
          subject: "Lunch Break",
          code: "BREAK",
          type: "Break",
          room: "Cafeteria",
          building: "Student Center",
          duration: 60,
          isBreak: true,
          description: "Lunch break for all students and faculty",
          menuToday: [
            "Grilled Chicken & Rice",
            "Vegetarian Pasta",
            "Fresh Salad Bar",
            "Fruit & Beverages",
          ],
          nutritionInfo: "Balanced meal with proteins, carbs, and vitamins",
        };
      } else if (day === "Friday" && index > 6) {
        timetable[day][slot] = {
          subject: "Free Period / Study Time",
          code: "FREE",
          type: "Free Period",
          room: "Library / Study Hall",
          building: "Academic Block",
          duration: 60,
          isFree: true,
          description: "Self-study time or library access",
          studyOptions: [
            "Group Study Rooms",
            "Silent Reading Area",
            "Computer Lab Access",
            "Tutoring Services",
          ],
          libraryServices:
            "Research assistance, book reservations, printing services",
        };
      } else if (isSpecialEvent) {
        // Add special weekly events
        const specialEvents = [
          {
            subject: "Tech Talk: Industry Insights",
            code: "EVENT01",
            type: "Special Event",
            room: "Auditorium",
            building: "Main Block",
            speaker: "Mr. John Smith, Senior Developer at TechCorp",
            topic: "Latest Trends in Software Development",
            mandatory: false,
            certificates: true,
          },
          {
            subject: "Coding Competition Prep",
            code: "COMP01",
            type: "Competition",
            room: "Computer Lab-B",
            building: "Engineering Block",
            coordinator: "Dr. Sarah Smith",
            prizes: ["₹10,000", "₹5,000", "₹2,500"],
            registration: "Open until Sept 15",
            platforms: ["CodeChef", "HackerRank", "LeetCode"],
          },
          {
            subject: "Student Council Meeting",
            code: "COUNCIL",
            type: "Administrative",
            room: "Committee Room",
            building: "Admin Block",
            agenda: "Academic Calendar Discussion",
            attendance: "Class Representatives Required",
            duration: 60,
          },
        ];

        const eventIndex = (days.indexOf(day) + index) % specialEvents.length;
        timetable[day][slot] = {
          ...specialEvents[eventIndex],
          isSpecialEvent: true,
          duration: 60,
          description: `Special weekly event - ${specialEvents[eventIndex].subject}`,
        };
      } else {
        const classType =
          index % 3 === 0 ? "Lab" : index % 2 === 0 ? "Lecture" : "Tutorial";
        const sessionNumber = Math.floor(index / 2) + 1;

        timetable[day][slot] = {
          // Basic Information
          subject: subject.name,
          code: subject.code,
          instructor: subject.instructor,
          instructorEmail: subject.instructorEmail,

          // Location Details
          room: subject.room,
          building: subject.building,
          floor: subject.floor,
          capacity: subject.capacity,

          // Class Details
          type: classType,
          duration: 60,
          credits: subject.credits,
          session: `Session ${sessionNumber}`,

          // Academic Information
          department: subject.department,
          prerequisites: subject.prerequisites,
          category: subject.category,

          // Additional Details
          description: subject.description,
          learningOutcomes: subject.learningOutcomes,
          assessmentMethods: subject.assessmentMethods,
          textbook: subject.textbook,

          // Session Specific
          topics: getSessionTopics(subject.code, classType, sessionNumber),
          assignments: getSessionAssignments(subject.code, sessionNumber),
          resources: getSessionResources(subject.code),

          // Enhanced Weekly Schedule Data
          currentProgress: subject.currentProgress,
          nextDeadline: subject.nextDeadline,
          labEquipment: subject.labEquipment,
          skillsGained: subject.skillsGained,

          // Status & Analytics
          attendance: Math.floor(Math.random() * 15) + 85, // 85-100%
          completed: sessionNumber <= 8, // First 8 sessions completed
          upcoming: sessionNumber === 9,
          difficulty: ["Beginner", "Intermediate", "Advanced"][
            Math.floor(Math.random() * 3)
          ],

          // Day-specific enhancements
          preparationNeeded:
            day === "Monday"
              ? "Review weekend material"
              : day === "Tuesday"
              ? "Complete pre-reading"
              : day === "Wednesday"
              ? "Prepare lab exercises"
              : day === "Thursday"
              ? "Review concepts"
              : "Wrap up weekly assignments",

          // Real-time class info
          classMode: Math.random() > 0.1 ? "In-Person" : "Online",
          recordingAvailable: classType === "Lecture" ? true : false,
          materialLinks: [
            `${subject.code}_Slides_Week${Math.ceil(sessionNumber / 2)}.pdf`,
            `${subject.code}_Notes_${day}.pdf`,
            `${subject.code}_Exercises_${sessionNumber}.pdf`,
          ],

          // Interactive elements
          pollsScheduled:
            classType === "Lecture" ? Math.floor(Math.random() * 3) + 1 : 0,
          breakoutSessions: classType === "Tutorial" ? true : false,
          handsOnActivity: classType === "Lab" ? true : false,

          // Performance tracking
          averageGrade: (Math.random() * 2 + 7).toFixed(1) + "/10", // 7.0-9.0 range
          participationScore: Math.floor(Math.random() * 21) + 80, // 80-100%
          homeworkStatus: sessionNumber <= 8 ? "Submitted" : "Pending",
        };
      }
    });
  });

  return {
    timetable,
    metadata: {
      // Academic Information
      semester: "Fall 2025",
      academicYear: "2024-25",
      year: "3rd Year",
      branch: "Computer Science & Engineering",
      section: "A",
      batch: "2022-26",

      // Program Details
      program: "Bachelor of Technology",
      university: "ABC University of Technology",
      college: "College of Engineering & Technology",
      department: "Computer Science & Engineering",

      // Statistics
      totalSubjects: subjects.length,
      coreSubjects: subjects.filter((s) => s.category === "Core Subject")
        .length,
      electiveSubjects: subjects.filter(
        (s) => s.category === "Elective Subject"
      ).length,
      totalCredits: subjects.reduce((sum, s) => sum + s.credits, 0),
      totalHours: days.length * (timeSlots.length - 1), // excluding breaks

      // Schedule Information
      workingDays: days,
      timeSlots: timeSlots,
      classesPerWeek: days.length * (timeSlots.length - 2), // excluding lunch & some free periods
      breakTime: "12:45-13:45",
      weeklyContactHours: days.length * (timeSlots.length - 2),
      specialEvents: 3,
      laboratorySessions: 15,
      lectureHours: 20,
      tutorialSessions: 10,

      // Student Information
      totalStudents: 45,
      attendanceRate: 91.5,
      classStrength: "Full",

      // Important Dates
      semesterStart: "2025-08-15",
      semesterEnd: "2025-12-20",
      midTermExams: "2025-10-15 to 2025-10-25",
      finalExams: "2025-12-01 to 2025-12-15",
      holidays: ["2025-10-02", "2025-11-14", "2025-11-15"],

      // Current Week Information (Sept 13, 2025)
      currentWeek: "Week 4 of 16",
      weekTheme: "Data Structures & Algorithm Analysis",
      upcomingDeadlines: [
        "CS201 Assignment 3 - Sept 20",
        "CS301 Database Project - Sept 25",
        "CS302 Network Lab Report - Sept 18",
      ],
      weeklyHighlights: [
        "Guest lecture on Wednesday",
        "Coding competition prep on Thursday",
        "Project presentations on Friday",
      ],

      // Contact Information
      classRepresentative: {
        name: "Alex Johnson",
        email: "alex.johnson.cse22@university.edu",
        phone: "+1-555-0123",
      },
      advisor: {
        name: "Dr. Sarah Smith",
        email: "s.smith@university.edu",
        office: "Faculty Block, Room 201",
      },
    },
  };
};

export const generateDemoFacultyTimetable = () => {
  const timeSlots = [
    "09:00-10:00",
    "10:00-11:00",
    "11:15-12:15",
    "12:15-13:15",
    "14:00-15:00",
    "15:00-16:00",
    "16:15-17:15",
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const classes = [
    {
      subject: "Data Structures & Algorithms",
      code: "CS201",
      class: "3rd Year CSE-A",
      room: "Computer Lab-A",
      building: "Engineering Block",
      floor: "2nd Floor",
      students: 45,
      enrolledStudents: 45,
      attendanceRate: 92,
      academicYear: "2024-25",
      semester: "Fall 2025",
      credits: 4,
      courseType: "Core",
      sessionType: "Lab",
      duration: 60,
      syllabus: "Arrays, Linked Lists, Trees, Graphs, Sorting, Searching",
      currentTopic: "Binary Search Trees",
      nextTopic: "Graph Algorithms",
      assignments: ["Assignment 3: Tree Implementation", "Lab Report 4"],
      upcomingEvents: [
        "Mid-term Exam on Sept 20",
        "Project Submission Sept 25",
      ],
    },
    {
      subject: "Data Structures & Algorithms",
      code: "CS201",
      class: "3rd Year CSE-B",
      room: "Computer Lab-B",
      building: "Engineering Block",
      floor: "2nd Floor",
      students: 42,
      enrolledStudents: 45,
      attendanceRate: 89,
      academicYear: "2024-25",
      semester: "Fall 2025",
      credits: 4,
      courseType: "Core",
      sessionType: "Lecture",
      duration: 60,
      syllabus: "Arrays, Linked Lists, Trees, Graphs, Sorting, Searching",
      currentTopic: "Hash Tables",
      nextTopic: "Graph Traversal",
      assignments: ["Assignment 3: Hash Implementation", "Quiz 2 Preparation"],
      upcomingEvents: ["Quiz 2 on Sept 18", "Project Demo Sept 27"],
    },
    {
      subject: "Machine Learning & AI",
      code: "CS401",
      class: "4th Year CSE-A",
      room: "AI Research Lab",
      building: "Research Block",
      floor: "1st Floor",
      students: 38,
      enrolledStudents: 40,
      attendanceRate: 95,
      academicYear: "2024-25",
      semester: "Fall 2025",
      credits: 4,
      courseType: "Elective",
      sessionType: "Research Seminar",
      duration: 60,
      syllabus:
        "ML Algorithms, Neural Networks, Deep Learning, AI Applications",
      currentTopic: "Deep Neural Networks",
      nextTopic: "Convolutional Neural Networks",
      assignments: ["Research Paper Review", "ML Model Implementation"],
      upcomingEvents: [
        "Research Presentation Sept 22",
        "Conference Paper Deadline Oct 1",
      ],
    },
    {
      subject: "Database Management Systems",
      code: "CS301L",
      class: "3rd Year CSE-A",
      room: "Database Lab",
      building: "IT Block",
      floor: "1st Floor",
      students: 45,
      enrolledStudents: 45,
      attendanceRate: 91,
      academicYear: "2024-25",
      semester: "Fall 2025",
      credits: 3,
      courseType: "Core",
      sessionType: "Lab",
      duration: 60,
      syllabus: "SQL, Database Design, Normalization, Transactions",
      currentTopic: "Advanced SQL Queries",
      nextTopic: "Database Optimization",
      assignments: ["Database Design Project", "SQL Lab Exercises"],
      upcomingEvents: [
        "Database Project Demo Sept 24",
        "Industry Visit Sept 30",
      ],
    },
    {
      subject: "Computer Networks & Security",
      code: "CS302",
      class: "3rd Year CSE-C",
      room: "Network Lab-102",
      building: "Engineering Block",
      floor: "3rd Floor",
      students: 40,
      enrolledStudents: 42,
      attendanceRate: 88,
      academicYear: "2024-25",
      semester: "Fall 2025",
      credits: 4,
      courseType: "Core",
      sessionType: "Lab",
      duration: 60,
      syllabus: "Network Protocols, Security, Distributed Systems",
      currentTopic: "Network Security Protocols",
      nextTopic: "Wireless Network Security",
      assignments: ["Network Simulation Project", "Security Analysis Report"],
      upcomingEvents: [
        "Network Project Demo Sept 26",
        "Cybersecurity Workshop Oct 3",
      ],
    },
    {
      subject: "Research Guidance & Thesis",
      code: "RG001",
      class: "PG Research Students",
      room: "Faculty Research Room",
      building: "Research Block",
      floor: "2nd Floor",
      students: 8,
      enrolledStudents: 10,
      attendanceRate: 100,
      academicYear: "2024-25",
      semester: "Fall 2025",
      credits: 6,
      courseType: "Research",
      sessionType: "One-on-One Guidance",
      duration: 60,
      syllabus: "Individual Research Topics, Thesis Writing, Publication",
      currentTopic: "Research Methodology & Literature Review",
      nextTopic: "Data Collection & Analysis",
      assignments: [
        "Literature Survey",
        "Research Proposal",
        "Thesis Chapter 1",
      ],
      upcomingEvents: [
        "Research Progress Review Sept 28",
        "Conference Submission Oct 5",
      ],
    },
    {
      subject: "Technical Seminar & Presentation",
      code: "SEM01",
      class: "4th Year CSE All Sections",
      room: "Main Seminar Hall",
      building: "Academic Block",
      floor: "Ground Floor",
      students: 120,
      enrolledStudents: 125,
      attendanceRate: 96,
      academicYear: "2024-25",
      semester: "Fall 2025",
      credits: 2,
      courseType: "Mandatory",
      sessionType: "Seminar",
      duration: 60,
      syllabus: "Technical Presentations, Industry Trends, Research Topics",
      currentTopic: "Emerging Technologies in AI",
      nextTopic: "Sustainable Computing",
      assignments: ["Technical Presentation", "Seminar Report"],
      upcomingEvents: [
        "Student Presentations Sept 19-21",
        "Industry Expert Talk Sept 29",
      ],
    },
  ];

  const timetable = {};

  days.forEach((day) => {
    timetable[day] = {};
    timeSlots.forEach((slot, index) => {
      // Add some randomness but ensure consistency for demo
      const classIndex =
        (days.indexOf(day) * timeSlots.length + index) % classes.length;
      const classInfo = classes[classIndex];

      // Skip some slots (lunch break, office hours, research time)
      if (slot === "12:15-13:15") {
        timetable[day][slot] = {
          subject: "Lunch Break & Faculty Meeting",
          code: "BREAK",
          class: "All Faculty",
          room: "Faculty Lounge",
          building: "Administrative Block",
          students: 0,
          type: "Break",
          duration: 60,
          isBreak: true,
          description: "Lunch break and weekly faculty coordination meeting",
          meetingAgenda: [
            "Course progress review",
            "Student feedback discussion",
            "Administrative updates",
          ],
        };
      } else if (day === "Friday" && index > 4) {
        timetable[day][slot] = {
          subject: "Research & Professional Development",
          code: "R&D",
          class: "Faculty Research Time",
          room: "Faculty Research Room",
          building: "Research Block",
          students: 0,
          type: "Research",
          duration: 60,
          isResearch: true,
          description:
            "Personal research time, paper writing, and professional development",
          activities: [
            "Research work",
            "Paper writing",
            "Grant applications",
            "Conference preparation",
          ],
          currentProjects: [
            "AI in Education",
            "Sustainable Computing",
            "Blockchain Applications",
          ],
        };
      } else {
        const sessionType =
          index % 3 === 0 ? "Lab" : index % 2 === 0 ? "Lecture" : "Tutorial";

        timetable[day][slot] = {
          // Basic Information
          subject: classInfo.subject,
          code: classInfo.code,
          class: classInfo.class,

          // Location Details
          room: classInfo.room,
          building: classInfo.building,
          floor: classInfo.floor,

          // Class Details
          students: classInfo.students,
          enrolledStudents: classInfo.enrolledStudents,
          attendanceRate: classInfo.attendanceRate,
          type: sessionType,
          duration: classInfo.duration,

          // Academic Information
          academicYear: classInfo.academicYear,
          semester: classInfo.semester,
          credits: classInfo.credits,
          courseType: classInfo.courseType,
          sessionType: classInfo.sessionType,

          // Course Content
          syllabus: classInfo.syllabus,
          currentTopic: classInfo.currentTopic,
          nextTopic: classInfo.nextTopic,

          // Assignments & Events
          assignments: classInfo.assignments,
          upcomingEvents: classInfo.upcomingEvents,

          // Teaching Details
          preparationTime: 30, // minutes
          gradingPending: Math.floor(Math.random() * 15), // number of assignments
          officeHoursAfter: index < 3, // morning classes have office hours after

          // Resources Needed
          equipment: getRequiredEquipment(sessionType),
          materials: getRequiredMaterials(classInfo.code),

          // Performance Metrics
          studentFeedback: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0 rating
          courseProgress: Math.floor(Math.random() * 30 + 60), // 60-90% complete
        };
      }
    });
  });

  return {
    timetable,
    metadata: {
      // Faculty Information
      facultyName: "Dr. Sarah Smith",
      employeeId: "FAC001",
      designation: "Assistant Professor",
      department: "Computer Science & Engineering",
      qualification: "Ph.D. in Computer Science",
      experience: "8 years",
      specialization: [
        "Data Structures",
        "Machine Learning",
        "Database Systems",
      ],

      // Academic Information
      semester: "Fall 2025",
      academicYear: "2024-25",
      university: "ABC University of Technology",
      college: "College of Engineering & Technology",

      // Teaching Load
      totalClasses: classes.length,
      totalStudents: classes.reduce((sum, cls) => sum + cls.students, 0),
      totalSections: new Set(classes.map((cls) => cls.class)).size,
      coreSubjects: classes.filter((cls) => cls.courseType === "Core").length,
      electiveSubjects: classes.filter((cls) => cls.courseType === "Elective")
        .length,
      researchGuidance: classes.filter((cls) => cls.courseType === "Research")
        .length,

      // Schedule Information
      workingDays: days,
      timeSlots: timeSlots,
      workingHours: days.length * (timeSlots.length - 1),
      teachingHoursPerWeek: days.length * (timeSlots.length - 2), // excluding breaks and research time
      officeHours: "Mon-Fri 2:00-3:00 PM",
      consultationDays: ["Monday", "Wednesday", "Friday"],

      // Performance Metrics
      averageAttendance: (
        classes.reduce((sum, cls) => sum + cls.attendanceRate, 0) /
        classes.length
      ).toFixed(1),
      studentFeedbackRating: "4.3/5.0",
      coursesCompleted: "75%",
      researchProjects: 3,

      // Administrative Duties
      committees: [
        "Academic Committee",
        "Examination Committee",
        "Student Affairs",
      ],
      administrativeRole: "HOD Assistant",

      // Research Information
      currentResearch: [
        "AI in Education",
        "Sustainable Computing",
        "Blockchain Applications",
      ],
      publications: 15,
      conferences: 8,
      journals: 7,

      // Contact Information
      office: "Faculty Block, Room 201",
      email: "s.smith@university.edu",
      phone: "+1-555-0198",
      officeExtension: "2201",

      // Important Dates
      semesterStart: "2025-08-15",
      semesterEnd: "2025-12-20",
      examDuties: ["2025-10-20", "2025-12-10"],
      facultyMeetings: ["Every Friday 1:00 PM"],
      conferenceDeadlines: [
        "IEEE Conference - Oct 1",
        "ACM Conference - Nov 15",
      ],

      // Resources
      assignedEquipment: ["Laptop", "Projector", "Research Lab Access"],
      softwareLicenses: ["MATLAB", "Visual Studio", "Adobe Creative Suite"],
      libraryAccess: "Full Access",
      labAccess: ["Computer Lab-A", "Database Lab", "AI Research Lab"],
    },
  };
};

export const generateDemoUpcomingClasses = (isStudent = true) => {
  const today = new Date();
  const upcomingClasses = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    if (isStudent) {
      upcomingClasses.push({
        id: i + 1,
        subject: [
          "Data Structures",
          "Database Systems",
          "Computer Networks",
          "Machine Learning",
          "Web Development",
        ][i],
        code: ["CS201", "CS301", "CS302", "CS401", "CS304"][i],
        time: [
          "09:00-10:00",
          "10:00-11:00",
          "11:15-12:15",
          "14:00-15:00",
          "15:00-16:00",
        ][i],
        room: ["Lab-A", "Room-101", "Room-102", "Lab-B", "Lab-C"][i],
        instructor: [
          "Dr. Smith",
          "Prof. Johnson",
          "Dr. Brown",
          "Dr. Wilson",
          "Prof. Garcia",
        ][i],
        date: date.toISOString().split("T")[0],
        type: i % 2 === 0 ? "Lab" : "Lecture",
      });
    } else {
      upcomingClasses.push({
        id: i + 1,
        subject: [
          "Data Structures",
          "Advanced Algorithms",
          "Database Lab",
          "Computer Networks",
          "Research Guidance",
        ][i],
        code: ["CS201", "CS401", "CS301L", "CS302", "RG001"][i],
        time: [
          "09:00-10:00",
          "10:00-11:00",
          "11:15-12:15",
          "14:00-15:00",
          "15:00-16:00",
        ][i],
        room: ["Lab-A", "Room-101", "DB-Lab", "Room-102", "Faculty-Room"][i],
        class: [
          "3rd Year CSE-A",
          "4th Year CSE-A",
          "3rd Year CSE-A",
          "3rd Year CSE-C",
          "PG Students",
        ][i],
        students: [45, 38, 45, 40, 8][i],
        date: date.toISOString().split("T")[0],
        type: i % 2 === 0 ? "Lab" : "Lecture",
      });
    }
  }

  return upcomingClasses;
};

export const generateDemoAssignments = () => {
  const assignments = [
    {
      id: 1,
      title: "Binary Search Tree Implementation",
      subject: "Data Structures",
      code: "CS201",
      dueDate: "2025-09-18",
      status: "pending",
      priority: "high",
      description:
        "Implement BST with insertion, deletion, and traversal operations",
    },
    {
      id: 2,
      title: "Database Design Project",
      subject: "Database Systems",
      code: "CS301",
      dueDate: "2025-09-22",
      status: "in-progress",
      priority: "medium",
      description: "Design a complete database for library management system",
    },
    {
      id: 3,
      title: "Network Protocol Analysis",
      subject: "Computer Networks",
      code: "CS302",
      dueDate: "2025-09-25",
      status: "pending",
      priority: "medium",
      description: "Analyze TCP/IP protocol stack and create presentation",
    },
    {
      id: 4,
      title: "Machine Learning Model",
      subject: "Machine Learning",
      code: "CS401",
      dueDate: "2025-09-28",
      status: "not-started",
      priority: "high",
      description:
        "Train and evaluate a classification model on provided dataset",
    },
    {
      id: 5,
      title: "Web Application Development",
      subject: "Web Development",
      code: "CS304",
      dueDate: "2025-10-05",
      status: "not-started",
      priority: "low",
      description:
        "Create a responsive web application using React and Node.js",
    },
  ];

  return assignments;
};
