import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Timetable Export Service for Excel and PDF formats
export class TimetableExportService {
  /**
   * Export timetable to Excel format
   * @param {Object} timetableData - Complete timetable data with metadata
   * @param {string} filename - Optional filename (without extension)
   * @param {boolean} isStudent - Whether this is for student or faculty
   */
  static exportToExcel(
    timetableData,
    filename = "timetable",
    isStudent = true
  ) {
    const workbook = XLSX.utils.book_new();

    // Sheet 1: Main Timetable
    const timetableSheet = this.createTimetableSheet(
      timetableData.timetable,
      isStudent
    );
    XLSX.utils.book_append_sheet(workbook, timetableSheet, "Weekly Timetable");

    // Sheet 2: Detailed Information
    const detailsSheet = this.createDetailsSheet(
      timetableData.timetable,
      isStudent
    );
    XLSX.utils.book_append_sheet(
      workbook,
      detailsSheet,
      "Detailed Information"
    );

    // Sheet 3: Metadata and Statistics
    const metadataSheet = this.createMetadataSheet(
      timetableData.metadata,
      isStudent
    );
    XLSX.utils.book_append_sheet(
      workbook,
      metadataSheet,
      "Academic Information"
    );

    // Sheet 4: Subject Summary (for students) or Class Summary (for faculty)
    const summarySheet = isStudent
      ? this.createSubjectSummarySheet(timetableData.timetable)
      : this.createClassSummarySheet(timetableData.timetable);
    XLSX.utils.book_append_sheet(
      workbook,
      summarySheet,
      isStudent ? "Subject Summary" : "Class Summary"
    );

    // Generate and download
    const timestamp = new Date().toISOString().split("T")[0];
    const finalFilename = `${filename}_${timestamp}.xlsx`;
    XLSX.writeFile(workbook, finalFilename);

    return finalFilename;
  }

  /**
   * Export timetable to PDF format
   * @param {Object} timetableData - Complete timetable data with metadata
   * @param {string} filename - Optional filename (without extension)
   * @param {boolean} isStudent - Whether this is for student or faculty
   */
  static exportToPDF(timetableData, filename = "timetable", isStudent = true) {
    const doc = new jsPDF("landscape", "mm", "a4");

    // Page 1: Header and Main Timetable
    this.addPDFHeader(doc, timetableData.metadata, isStudent);
    this.addMainTimetableToPDF(doc, timetableData.timetable, isStudent);

    // Page 2: Detailed Information
    doc.addPage();
    this.addDetailedInformationToPDF(doc, timetableData.timetable, isStudent);

    // Page 3: Academic Information and Statistics
    doc.addPage();
    this.addAcademicInfoToPDF(doc, timetableData.metadata, isStudent);

    // Generate and download
    const timestamp = new Date().toISOString().split("T")[0];
    const finalFilename = `${filename}_${timestamp}.pdf`;
    doc.save(finalFilename);

    return finalFilename;
  }

  // Excel Helper Methods
  static createTimetableSheet(timetable, isStudent) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = Object.keys(timetable[days[0]] || {});

    const data = [];

    // Header row
    data.push(["Time Slot", ...days]);

    // Data rows
    timeSlots.forEach((slot) => {
      const row = [slot];
      days.forEach((day) => {
        const classInfo = timetable[day]?.[slot];
        if (!classInfo) {
          row.push("");
        } else if (classInfo.isBreak) {
          row.push("LUNCH BREAK");
        } else if (classInfo.isFree) {
          row.push("FREE PERIOD");
        } else {
          const cellContent = isStudent
            ? `${classInfo.subject}\n${classInfo.code}\n${classInfo.room}\n${classInfo.instructor}`
            : `${classInfo.subject}\n${classInfo.code}\n${classInfo.class}\n${classInfo.room}\n${classInfo.students} students`;
          row.push(cellContent);
        }
      });
      data.push(row);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Set column widths
    const colWidths = [{ wch: 15 }, ...days.map(() => ({ wch: 25 }))];
    worksheet["!cols"] = colWidths;

    // Set row heights for better readability
    const rowHeights = data.map(() => ({ hpx: 60 }));
    worksheet["!rows"] = rowHeights;

    return worksheet;
  }

  static createDetailsSheet(timetable, isStudent) {
    const data = [];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    // Headers
    const headers = isStudent
      ? [
          "Day",
          "Time",
          "Subject",
          "Code",
          "Instructor",
          "Room",
          "Building",
          "Type",
          "Credits",
          "Topics",
          "Assignments",
        ]
      : [
          "Day",
          "Time",
          "Subject",
          "Code",
          "Class",
          "Room",
          "Building",
          "Students",
          "Type",
          "Current Topic",
          "Assignments",
        ];
    data.push(headers);

    // Data rows
    days.forEach((day) => {
      const daySchedule = timetable[day] || {};
      Object.entries(daySchedule).forEach(([time, classInfo]) => {
        if (!classInfo || classInfo.isBreak || classInfo.isFree) return;

        const row = isStudent
          ? [
              day,
              time,
              classInfo.subject || "",
              classInfo.code || "",
              classInfo.instructor || "",
              classInfo.room || "",
              classInfo.building || "",
              classInfo.type || "",
              classInfo.credits || "",
              classInfo.topics || "",
              (classInfo.assignments || []).join("; "),
            ]
          : [
              day,
              time,
              classInfo.subject || "",
              classInfo.code || "",
              classInfo.class || "",
              classInfo.room || "",
              classInfo.building || "",
              classInfo.students || "",
              classInfo.type || "",
              classInfo.currentTopic || "",
              (classInfo.assignments || []).join("; "),
            ];

        data.push(row);
      });
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Set column widths
    const colWidths = headers.map(() => ({ wch: 20 }));
    worksheet["!cols"] = colWidths;

    return worksheet;
  }

  static createMetadataSheet(metadata, isStudent) {
    const data = [];

    if (isStudent) {
      data.push(["STUDENT ACADEMIC INFORMATION", ""]);
      data.push(["", ""]);
      data.push(["Academic Details", ""]);
      data.push(["Semester", metadata.semester || ""]);
      data.push(["Academic Year", metadata.academicYear || ""]);
      data.push(["Year", metadata.year || ""]);
      data.push(["Branch", metadata.branch || ""]);
      data.push(["Section", metadata.section || ""]);
      data.push(["Program", metadata.program || ""]);
      data.push(["", ""]);
      data.push(["Institution Details", ""]);
      data.push(["University", metadata.university || ""]);
      data.push(["College", metadata.college || ""]);
      data.push(["Department", metadata.department || ""]);
      data.push(["", ""]);
      data.push(["Statistics", ""]);
      data.push(["Total Subjects", metadata.totalSubjects || ""]);
      data.push(["Core Subjects", metadata.coreSubjects || ""]);
      data.push(["Elective Subjects", metadata.electiveSubjects || ""]);
      data.push(["Total Credits", metadata.totalCredits || ""]);
      data.push(["Weekly Hours", metadata.totalHours || ""]);
      data.push(["", ""]);
      data.push(["Important Dates", ""]);
      data.push(["Semester Start", metadata.semesterStart || ""]);
      data.push(["Semester End", metadata.semesterEnd || ""]);
      data.push(["Mid-term Exams", metadata.midTermExams || ""]);
      data.push(["Final Exams", metadata.finalExams || ""]);
    } else {
      data.push(["FACULTY INFORMATION", ""]);
      data.push(["", ""]);
      data.push(["Personal Details", ""]);
      data.push(["Name", metadata.facultyName || ""]);
      data.push(["Employee ID", metadata.employeeId || ""]);
      data.push(["Designation", metadata.designation || ""]);
      data.push(["Department", metadata.department || ""]);
      data.push(["Qualification", metadata.qualification || ""]);
      data.push(["Experience", metadata.experience || ""]);
      data.push(["", ""]);
      data.push(["Teaching Load", ""]);
      data.push(["Total Classes", metadata.totalClasses || ""]);
      data.push(["Total Students", metadata.totalStudents || ""]);
      data.push(["Core Subjects", metadata.coreSubjects || ""]);
      data.push(["Elective Subjects", metadata.electiveSubjects || ""]);
      data.push(["Research Guidance", metadata.researchGuidance || ""]);
      data.push(["", ""]);
      data.push(["Performance", ""]);
      data.push(["Average Attendance", metadata.averageAttendance + "%" || ""]);
      data.push(["Student Feedback", metadata.studentFeedbackRating || ""]);
      data.push(["Publications", metadata.publications || ""]);
      data.push(["Conferences", metadata.conferences || ""]);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Set column widths
    worksheet["!cols"] = [{ wch: 25 }, { wch: 30 }];

    return worksheet;
  }

  static createSubjectSummarySheet(timetable) {
    const subjects = new Map();
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    // Collect all subjects
    days.forEach((day) => {
      const daySchedule = timetable[day] || {};
      Object.values(daySchedule).forEach((classInfo) => {
        if (
          classInfo &&
          !classInfo.isBreak &&
          !classInfo.isFree &&
          classInfo.code
        ) {
          const key = classInfo.code;
          if (!subjects.has(key)) {
            subjects.set(key, {
              code: classInfo.code,
              subject: classInfo.subject,
              instructor: classInfo.instructor,
              credits: classInfo.credits,
              room: classInfo.room,
              building: classInfo.building,
              type: classInfo.type,
              sessions: 0,
              totalHours: 0,
            });
          }
          const subjectData = subjects.get(key);
          subjectData.sessions++;
          subjectData.totalHours += classInfo.duration || 60;
        }
      });
    });

    const data = [];
    data.push([
      "Subject Code",
      "Subject Name",
      "Instructor",
      "Credits",
      "Room",
      "Building",
      "Sessions/Week",
      "Hours/Week",
    ]);

    Array.from(subjects.values()).forEach((subject) => {
      data.push([
        subject.code,
        subject.subject,
        subject.instructor,
        subject.credits,
        subject.room,
        subject.building,
        subject.sessions,
        Math.round((subject.totalHours / 60) * 10) / 10, // Convert to hours
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    worksheet["!cols"] = [
      { wch: 15 },
      { wch: 30 },
      { wch: 20 },
      { wch: 10 },
      { wch: 15 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
    ];

    return worksheet;
  }

  static createClassSummarySheet(timetable) {
    const classes = new Map();
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    // Collect all classes
    days.forEach((day) => {
      const daySchedule = timetable[day] || {};
      Object.values(daySchedule).forEach((classInfo) => {
        if (
          classInfo &&
          !classInfo.isBreak &&
          !classInfo.isFree &&
          classInfo.code
        ) {
          const key = `${classInfo.code}-${classInfo.class}`;
          if (!classes.has(key)) {
            classes.set(key, {
              code: classInfo.code,
              subject: classInfo.subject,
              class: classInfo.class,
              students: classInfo.students,
              room: classInfo.room,
              building: classInfo.building,
              attendanceRate: classInfo.attendanceRate,
              sessions: 0,
              totalHours: 0,
            });
          }
          const classData = classes.get(key);
          classData.sessions++;
          classData.totalHours += classInfo.duration || 60;
        }
      });
    });

    const data = [];
    data.push([
      "Subject Code",
      "Subject Name",
      "Class",
      "Students",
      "Room",
      "Building",
      "Attendance %",
      "Sessions/Week",
      "Hours/Week",
    ]);

    Array.from(classes.values()).forEach((classData) => {
      data.push([
        classData.code,
        classData.subject,
        classData.class,
        classData.students,
        classData.room,
        classData.building,
        classData.attendanceRate + "%",
        classData.sessions,
        Math.round((classData.totalHours / 60) * 10) / 10,
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    worksheet["!cols"] = [
      { wch: 15 },
      { wch: 25 },
      { wch: 20 },
      { wch: 10 },
      { wch: 15 },
      { wch: 20 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 },
    ];

    return worksheet;
  }

  // PDF Helper Methods
  static addPDFHeader(doc, metadata, isStudent) {
    // Title
    doc.setFontSize(20);
    doc.setFont(undefined, "bold");
    const title = isStudent ? "STUDENT TIMETABLE" : "FACULTY TIMETABLE";
    doc.text(title, doc.internal.pageSize.width / 2, 20, { align: "center" });

    // Institution info
    doc.setFontSize(12);
    doc.setFont(undefined, "normal");
    const institution = metadata.university || "ABC University of Technology";
    doc.text(institution, doc.internal.pageSize.width / 2, 30, {
      align: "center",
    });

    // Academic info
    doc.setFontSize(10);
    if (isStudent) {
      const academicInfo = `${metadata.semester || "Fall 2025"} | ${
        metadata.year || "3rd Year"
      } | ${metadata.branch || "Computer Science"} | Section ${
        metadata.section || "A"
      }`;
      doc.text(academicInfo, doc.internal.pageSize.width / 2, 40, {
        align: "center",
      });
    } else {
      const facultyInfo = `${metadata.facultyName || "Dr. Sarah Smith"} | ${
        metadata.designation || "Assistant Professor"
      } | ${metadata.department || "Computer Science"}`;
      doc.text(facultyInfo, doc.internal.pageSize.width / 2, 40, {
        align: "center",
      });
    }

    // Date
    const currentDate = new Date().toLocaleDateString();
    doc.text(
      `Generated on: ${currentDate}`,
      doc.internal.pageSize.width - 20,
      15,
      { align: "right" }
    );
  }

  static addMainTimetableToPDF(doc, timetable, isStudent) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = Object.keys(timetable[days[0]] || {});

    const tableData = [];
    const headers = ["Time", ...days];

    timeSlots.forEach((slot) => {
      const row = [slot];
      days.forEach((day) => {
        const classInfo = timetable[day]?.[slot];
        if (!classInfo) {
          row.push("");
        } else if (classInfo.isBreak) {
          row.push("LUNCH\nBREAK");
        } else if (classInfo.isFree) {
          row.push("FREE\nPERIOD");
        } else {
          const cellContent = isStudent
            ? `${classInfo.subject}\n${classInfo.code}\n${classInfo.room}`
            : `${classInfo.subject}\n${classInfo.class}\n${classInfo.room}`;
          row.push(cellContent);
        }
      });
      tableData.push(row);
    });

    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 50,
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 3,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 25, fontStyle: "bold" },
        1: { cellWidth: 45 },
        2: { cellWidth: 45 },
        3: { cellWidth: 45 },
        4: { cellWidth: 45 },
        5: { cellWidth: 45 },
      },
      didParseCell: function (data) {
        if (data.row.index >= 0 && data.column.index > 0) {
          const cellText = data.cell.text.join(" ");
          if (cellText.includes("LUNCH") || cellText.includes("FREE")) {
            data.cell.styles.fillColor = [240, 240, 240];
            data.cell.styles.fontStyle = "italic";
          }
        }
      },
    });
  }

  static addDetailedInformationToPDF(doc, timetable, isStudent) {
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("DETAILED SCHEDULE INFORMATION", 20, 20);

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const tableData = [];
    const headers = isStudent
      ? ["Day", "Time", "Subject", "Code", "Instructor", "Room", "Type"]
      : ["Day", "Time", "Subject", "Class", "Students", "Room", "Type"];

    days.forEach((day) => {
      const daySchedule = timetable[day] || {};
      Object.entries(daySchedule).forEach(([time, classInfo]) => {
        if (!classInfo || classInfo.isBreak || classInfo.isFree) return;

        const row = isStudent
          ? [
              day,
              time,
              classInfo.subject || "",
              classInfo.code || "",
              classInfo.instructor || "",
              classInfo.room || "",
              classInfo.type || "",
            ]
          : [
              day,
              time,
              classInfo.subject || "",
              classInfo.class || "",
              classInfo.students || "",
              classInfo.room || "",
              classInfo.type || "",
            ];

        tableData.push(row);
      });
    });

    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 30,
      theme: "striped",
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontStyle: "bold",
      },
    });
  }

  static addAcademicInfoToPDF(doc, metadata, isStudent) {
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    const title = isStudent ? "ACADEMIC INFORMATION" : "FACULTY INFORMATION";
    doc.text(title, 20, 20);

    let yPosition = 40;
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");

    if (isStudent) {
      const info = [
        ["Academic Year:", metadata.academicYear || ""],
        ["Semester:", metadata.semester || ""],
        ["Program:", metadata.program || ""],
        ["Year:", metadata.year || ""],
        ["Branch:", metadata.branch || ""],
        ["Section:", metadata.section || ""],
        ["Total Subjects:", metadata.totalSubjects || ""],
        ["Total Credits:", metadata.totalCredits || ""],
        ["Weekly Hours:", metadata.totalHours || ""],
        ["University:", metadata.university || ""],
        ["College:", metadata.college || ""],
        ["Department:", metadata.department || ""],
      ];

      info.forEach(([label, value]) => {
        doc.setFont(undefined, "bold");
        doc.text(label, 20, yPosition);
        doc.setFont(undefined, "normal");
        doc.text(value.toString(), 80, yPosition);
        yPosition += 8;
      });
    } else {
      const info = [
        ["Faculty Name:", metadata.facultyName || ""],
        ["Employee ID:", metadata.employeeId || ""],
        ["Designation:", metadata.designation || ""],
        ["Department:", metadata.department || ""],
        ["Qualification:", metadata.qualification || ""],
        ["Experience:", metadata.experience || ""],
        ["Total Classes:", metadata.totalClasses || ""],
        ["Total Students:", metadata.totalStudents || ""],
        ["Teaching Hours/Week:", metadata.teachingHoursPerWeek || ""],
        ["Average Attendance:", (metadata.averageAttendance || "") + "%"],
        ["Student Feedback:", metadata.studentFeedbackRating || ""],
        ["Publications:", metadata.publications || ""],
      ];

      info.forEach(([label, value]) => {
        doc.setFont(undefined, "bold");
        doc.text(label, 20, yPosition);
        doc.setFont(undefined, "normal");
        doc.text(value.toString(), 80, yPosition);
        yPosition += 8;
      });
    }
  }
}
