1; // Build preset datasets for school/college/btech/mtech based on provided options
// options: { domain: 'school'|'college'|'btech'|'mtech', role: 'student'|'teacher', class, year, stream, branch }

const primaryTeachers = [
  "Mrs. Priya Sharma",
  "Ms. Sunita Verma",
  "Mrs. Anjali Gupta",
  "Mr. Rajesh Kumar",
  "Ms. Deepa Singh",
  "Mrs. Meena Patel",
  "Mr. Vikas Joshi",
  "Ms. Neha Reddy",
  "Mrs. Kavita Desai",
  "Mr. Amit Tiwari",
  "Ms. Pooja Nair",
  "Mrs. Geeta Menon",
  "Mr. Sanjay Mishra",
  "Ms. Ritu Jain",
  "Mrs. Suman Rao",
];

const secondaryTeachers = [
  "Mr. Alok Srivastava",
  "Mrs. Archana Singh",
  "Mr. Sameer Bhatt",
  "Ms. Vandana Rao",
  "Mr. Deepak Sharma",
  "Mrs. Nalini Iyer",
  "Mr. Rakesh Pandey",
  "Ms. Shruti Khanna",
  "Mr. Vinod Chauhan",
  "Mrs. Swati Agarwal",
  "Mr. Prakash Dubey",
  "Ms. Meenakshi Verma",
  "Mr. Anand Kulkarni",
  "Mrs. Preeti Mathur",
  "Mr. Girish Reddy",
  "Ms. Charu Saxena",
  "Mr. Saurabh Patil",
  "Mrs. Rita Deshmukh",
  "Mr. Avinash Gaikwad",
  "Ms. Shilpa Jain",
];

function makeTimeslots(daysOption = "mon-fri") {
  const daySets = {
    "mon-fri": ["Mon", "Tue", "Wed", "Thu", "Fri"],
    "mon-sat": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    all: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };
  const days = daySets[daysOption] || daySets["mon-fri"];
  const hours = [
    ["09:00", "10:00"],
    ["10:00", "11:00"],
    ["11:00", "12:00"],
    ["12:00", "13:00"],
    ["13:00", "14:00"],
    ["14:00", "15:00"],
  ];
  const slots = [];
  let i = 1;
  for (const d of days) {
    for (const [start, end] of hours) {
      slots.push({ id: `${d}-${i}`, day: d, start, end });
      i++;
    }
  }
  return slots;
}

function makeRooms() {
  return [
    { id: "R1", name: "Lecture Hall 1", type: "lecture", capacity: 60 },
    { id: "R2", name: "Lecture Hall 2", type: "lecture", capacity: 60 },
    { id: "R3", name: "Lab 1", type: "lab", capacity: 30 },
  ];
}

function makeFaculty(names) {
  // Create faculty from names
  return names.map((name, idx) => ({
    id: `F${idx + 1}`,
    name,
    maxHoursPerWeek: 10,
    preferredSlots: [],
  }));
}

function courseListForSchool(cls) {
  const primary = [
    "English",
    "Hindi",
    "Mathematics",
    "Environmental Studies",
    "Art and Craft",
    "Physical Education",
    "Moral Science",
    "Computer Basics",
  ];
  const middle = [
    "English",
    "Hindi",
    "Third Language",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Civics",
    "Geography",
    "Computer Science",
    "Art / Music / Dance",
    "Physical Education",
    "General Knowledge",
  ];
  const secondary = [
    "English",
    "Second Language",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Political Science",
    "Economics",
    "Information Technology",
    "Physical Education",
    "Art Education",
  ];
  const seniorScience = [
    "English",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Computer Science",
    "Informatics Practices",
    "Economics",
    "Physical Education",
  ];

  if (cls <= 5) return primary;
  if (cls <= 8) return middle;
  if (cls <= 10) return secondary;
  // default senior secondary science stream
  return seniorScience;
}

function courseListForBtech(year, branch = "CSE") {
  const firstYear = [
    "Engineering Mathematics I",
    "Engineering Mathematics II",
    "Engineering Physics",
    "Engineering Chemistry",
    "Programming for Problem Solving",
    "Basic Electrical Engineering",
    "Basic Electronics Engineering",
    "Engineering Graphics & Design",
    "Workshop / Manufacturing Practices",
    "Communication Skills",
  ];
  const byBranch = {
    CSE: [
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Theory of Computation",
      "Compiler Design",
      "Software Engineering",
      "Artificial Intelligence & Machine Learning",
      "Web Technologies",
      "Cyber Security",
      "Cloud Computing",
    ],
    ECE: [
      "Analog and Digital Electronics",
      "Signals and Systems",
      "Electromagnetic Theory",
      "Communication Systems",
      "Microprocessors & Microcontrollers",
      "VLSI Design",
      "Digital Signal Processing",
      "Control Systems",
      "Antennas and Wave Propagation",
      "Embedded Systems",
    ],
    ME: [
      "Engineering Mechanics",
      "Thermodynamics",
      "Fluid Mechanics",
      "Strength of Materials",
      "Theory of Machines",
      "Manufacturing Technology",
      "Machine Design",
      "Heat and Mass Transfer",
      "Automobile Engineering",
      "Robotics and Automation",
    ],
    CE: [
      "Surveying",
      "Building Materials and Construction",
      "Structural Analysis",
      "Geotechnical Engineering",
      "Transportation Engineering",
      "Hydrology and Water Resources",
      "Environmental Engineering",
      "Design of Concrete Structures",
      "Design of Steel Structures",
    ],
  };

  if (year === 1) return firstYear;
  const list = byBranch[branch] || byBranch.CSE;
  // sample 8 subjects per year for years 2-4
  return list.slice(0, 8);
}

function courseListForMtech(specialization = "CSE") {
  const mtech = {
    CSE: [
      "Advanced Algorithms & Complexity",
      "Advanced Computer Architecture",
      "Deep Learning",
      "Natural Language Processing",
      "Big Data Analytics",
      "Cloud Computing & Virtualization",
      "Cryptography and Network Security",
    ],
    VLSI: [
      "Advanced Digital Design",
      "Analog VLSI Design",
      "Semiconductor Device Modeling",
      "FPGA Architecture and Design",
      "Low Power VLSI Design",
      "Testing and Verification of VLSI Circuits",
    ],
    Structural: [
      "Advanced Structural Analysis",
      "Finite Element Methods",
      "Structural Dynamics & Earthquake Engineering",
      "Bridge Engineering",
      "Advanced Concrete Technology",
      "Theory of Elasticity and Plasticity",
    ],
    Thermal: [
      "Advanced Thermodynamics",
      "Advanced Fluid Mechanics",
      "Computational Fluid Dynamics",
      "Advanced Heat Transfer",
      "Refrigeration and AC Design",
      "Jet and Rocket Propulsion",
    ],
  };
  return mtech[specialization] || mtech.CSE;
}

export function buildPresetData(options = {}) {
  const domain = options.domain || "school";
  const role = options.role || "student";
  const cls = options.class || 10;
  const year = Number(options.year) || 1;
  const branch = options.branch || "CSE";
  const stream = options.stream || "Science"; // for senior secondary
  const days = options.days || "mon-fri"; // mon-fri | mon-sat | all

  const timeslots = makeTimeslots(days);
  const rooms = makeRooms();

  let courseNames = [];
  let program = "School";

  if (domain === "bed") {
    courseNames = courseListForSchool(cls);
    program = cls <= 10 ? `Class ${cls}` : `Senior Secondary (${stream})`;
  } else if (domain === "fyup") {
    courseNames = [
      "English",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Computer Science",
      "Economics",
      "Physical Education",
    ];
    program = "FYUP";
  } else if (domain === "btech") {
    courseNames = courseListForBtech(year, branch);
    program = `B.Tech ${branch} Y${year}`;
  } else if (domain === "mtech") {
    courseNames = courseListForMtech(
      branch === "ECE"
        ? "VLSI"
        : branch === "ME"
        ? "Thermal"
        : branch === "CE"
        ? "Structural"
        : "CSE"
    );
    program = `M.Tech ${branch}`;
  } else {
    // default
    courseNames = ["General Course"];
    program = "General";
  }

  let teachers;
  if (domain === "school" && cls <= 5) {
    teachers = primaryTeachers.slice(0, courseNames.length);
  } else if (domain === "school") {
    teachers = secondaryTeachers.slice(0, courseNames.length);
  } else {
    teachers = courseNames.map((s) => `${s} Faculty`);
  }

  const faculty = makeFaculty(teachers);

  // map facultyIds by subject index
  const courses = courseNames.map((name, i) => ({
    id: `C${i + 1}`,
    name,
    program,
    credits: 3,
    hoursPerCredit: 1,
    meetingsRequired: 1, // 1 meeting per week
    enrollment: 40,
    facultyIds: [`F${i + 1}`],
    roomTypes: ["lecture"],
  }));

  // simple students set referencing all courses -> ensures conflicts are avoided by solver
  const students = Array.from({ length: 30 }).map((_, i) => ({
    id: `S${i + 1}`,
    program,
    semester: domain === "school" ? cls : year,
    courses: courses.map((c) => c.id),
  }));

  return { timeslots, rooms, faculty, courses, students, constraints: {} };
}
