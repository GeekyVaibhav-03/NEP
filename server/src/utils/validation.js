import { z } from "zod";

const Timeslot = z.object({
  id: z.string(),
  day: z.string(),
  start: z.string(),
  end: z.string(),
});
const Room = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string().optional(),
  capacity: z.number().int().nonnegative().optional(),
  unavailable: z.array(z.string()).optional(),
});
const Faculty = z.object({
  id: z.string(),
  name: z.string(),
  maxHoursPerWeek: z.number().int().nonnegative().optional(),
  preferredSlots: z.array(z.string()).optional(),
  unavailable: z.array(z.string()).optional(),
});
const Course = z.object({
  id: z.string(),
  name: z.string(),
  program: z.string().optional(),
  credits: z.number().optional(),
  hoursPerCredit: z.number().optional(),
  meetingsRequired: z.number().int().positive().optional(),
  enrollment: z.number().int().nonnegative().optional(),
  preferredSlots: z.array(z.string()).optional(),
  facultyIds: z.array(z.string()).optional(),
  roomTypes: z.array(z.string()).optional(),
});
const Student = z.object({
  id: z.string(),
  program: z.string().optional(),
  semester: z.number().int().optional(),
  courses: z.array(z.string()).optional(),
  credits: z.number().optional(),
});

const DataSchema = z.object({
  timeslots: z.array(Timeslot),
  rooms: z.array(Room),
  faculty: z.array(Faculty),
  courses: z.array(Course),
  students: z.array(Student),
  constraints: z.record(z.any()).optional(),
});

export function validateInput(data) {
  const parsed = DataSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid input: ${issues}`);
  }
}
