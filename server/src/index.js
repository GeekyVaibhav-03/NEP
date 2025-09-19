import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import timetableRouter from "./routes/timetable.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_, res) => res.json({ ok: true }));
app.use("/api/timetable", timetableRouter);
import authRouter from "./routes/auth.routes.js";
app.use("/api/auth", authRouter);

const PORT = Number(process.env.PORT) || 4010;
app.listen(PORT, () => console.log(`Timetable server listening on :${PORT}`));
