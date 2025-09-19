import { Router } from "express";
import {
  generateTimetable,
  getGeneratedTimetables,
  getFaculty,
  addFaculty,
  updateFaculty,
  getCourses,
  addCourse,
  updateCourse,
  getStudents,
  addStudent,
  updateStudent,
  getRooms,
  addRoom,
  updateRoom,
} from "../services/timetable.service.js";
import { exportExcel, exportPDF } from "../utils/exporters.js";
import { requireAuth } from "../utils/auth.js";

const router = Router();

// Get list of generated timetables
router.get("/list", (req, res) => {
  try {
    const list = getGeneratedTimetables();
    res.json({ ok: true, list });
  } catch (e) {
    console.error(e);
    res
      .status(400)
      .json({ ok: false, error: e?.message || "Failed to get list" });
  }
});

// Faculty management
router.get("/faculty", (req, res) => {
  try {
    const faculty = getFaculty();
    res.json({ ok: true, faculty });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.post("/faculty", (req, res) => {
  try {
    const newFaculty = addFaculty(req.body);
    res.json({ ok: true, faculty: newFaculty });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.put("/faculty/:id", (req, res) => {
  try {
    const updated = updateFaculty(req.params.id, req.body);
    if (updated) {
      res.json({ ok: true, faculty: updated });
    } else {
      res.status(404).json({ ok: false, error: "Faculty not found" });
    }
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

// Courses management
router.get("/courses", (req, res) => {
  try {
    const courses = getCourses();
    res.json({ ok: true, courses });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.post("/courses", (req, res) => {
  try {
    const newCourse = addCourse(req.body);
    res.json({ ok: true, course: newCourse });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.put("/courses/:id", (req, res) => {
  try {
    const updated = updateCourse(req.params.id, req.body);
    if (updated) {
      res.json({ ok: true, course: updated });
    } else {
      res.status(404).json({ ok: false, error: "Course not found" });
    }
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

// Students management
router.get("/students", (req, res) => {
  try {
    const students = getStudents();
    res.json({ ok: true, students });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.post("/students", (req, res) => {
  try {
    const newStudent = addStudent(req.body);
    res.json({ ok: true, student: newStudent });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.put("/students/:id", (req, res) => {
  try {
    const updated = updateStudent(req.params.id, req.body);
    if (updated) {
      res.json({ ok: true, student: updated });
    } else {
      res.status(404).json({ ok: false, error: "Student not found" });
    }
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

// Rooms management
router.get("/rooms", (req, res) => {
  try {
    const rooms = getRooms();
    res.json({ ok: true, rooms });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.post("/rooms", (req, res) => {
  try {
    const newRoom = addRoom(req.body);
    res.json({ ok: true, room: newRoom });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.put("/rooms/:id", (req, res) => {
  try {
    const updated = updateRoom(req.params.id, req.body);
    if (updated) {
      res.json({ ok: true, room: updated });
    } else {
      res.status(404).json({ ok: false, error: "Room not found" });
    }
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

// Generate week timetable (public for demo)
router.post("/generate", async (req, res) => {
  try {
    const { data, options, ...directOptions } = req.body || {};

    // Support both formats: { options: {...} } and direct options in body
    const finalOptions = options || directOptions;

    console.log("Received request body:", req.body);
    console.log("Final options:", finalOptions);

    const result = await generateTimetable(data, finalOptions);
    console.log("Generated timetable:", JSON.stringify(result, null, 2));
    res.json({ ok: true, ...result });
  } catch (e) {
    console.error("Timetable generation error:", e);
    res
      .status(400)
      .json({ ok: false, error: e?.message || "Failed to generate" });
  }
});

// Export endpoints (protected)
router.post("/export/xlsx", requireAuth, async (req, res) => {
  try {
    const { timetable, meta } = req.body || {};
    const buffer = exportExcel(timetable, meta);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="timetable.xlsx"'
    );
    res.end(Buffer.from(buffer));
  } catch (e) {
    console.error(e);
    res.status(400).json({ ok: false, error: e?.message || "Export failed" });
  }
});

router.post("/export/pdf", requireAuth, async (req, res) => {
  try {
    const { timetable, meta } = req.body || {};
    const buffer = await exportPDF(timetable, meta);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="timetable.pdf"'
    );
    res.end(buffer);
  } catch (e) {
    console.error(e);
    res.status(400).json({ ok: false, error: e?.message || "Export failed" });
  }
});

export default router;
