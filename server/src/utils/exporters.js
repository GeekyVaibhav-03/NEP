import XLSX from "xlsx";
import PDFDocument from "pdfkit";

export function exportExcel(timetable, meta = {}) {
  // Flatten simple sheet per program
  const wb = XLSX.utils.book_new();
  const programs = Object.keys(timetable?.byProgram || {});
  for (const p of programs) {
    const rows = [["Course", "Timeslot", "Room", "Faculty"]];
    const courses = timetable.byProgram[p];
    for (const cid of Object.keys(courses)) {
      for (const session of courses[cid]) {
        rows.push([
          cid,
          `${session.timeslot.day} ${session.timeslot.start}-${session.timeslot.end}`,
          session.room.name || session.room.id,
          session.faculty.name || session.faculty.id,
        ]);
      }
    }
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, sanitizeSheetName(p));
  }
  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
}

export function exportPDF(timetable, meta = {}) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc
      .fontSize(16)
      .text(meta.title || "Semester Timetable", { align: "center" });
    doc.moveDown();

    const programs = Object.keys(timetable?.byProgram || {});
    for (const p of programs) {
      doc.fontSize(14).text(`Program: ${p}`);
      doc.moveDown(0.5);
      const courses = timetable.byProgram[p];
      for (const cid of Object.keys(courses)) {
        doc.fontSize(12).text(`Course: ${cid}`);
        doc.moveDown(0.2);
        for (const session of courses[cid]) {
          doc
            .fontSize(10)
            .text(
              `${session.timeslot.day} ${session.timeslot.start}-${
                session.timeslot.end
              } | Room: ${session.room.name || session.room.id} | Faculty: ${
                session.faculty.name || session.faculty.id
              }`
            );
        }
        doc.moveDown(0.5);
      }
      doc.moveDown();
    }

    doc.end();
  });
}

function sanitizeSheetName(name) {
  return name.replace(/[\\/:?*\[\]]/g, "_").slice(0, 31);
}
