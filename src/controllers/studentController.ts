import { Request, Response } from "express";
import { fetchStudentFromApi } from "../services/apiClient";
import { getEventByCode } from "../services/eventService";
import { saveAttendance, hasAttendance } from "../services/attendanceService";

export async function getStudent(req: Request, res: Response): Promise<Response> {
  try {
    const { id, event_code } = req.query;

    if (!id || !event_code) {
      return res.status(400).json({
        error: "Missing required parameters",
        required: ["id", "event_code"],
      });
    }

    // 1. validate if event exists
    const event = await getEventByCode(event_code as string);
    if (!event) {
      return res.status(404).json({
        error: "Event not found",
        message: "The event code is invalid or the event does not exist",
      });
    }

    // 2. fetch student info from qol-api
    let student;
    try {
      student = await fetchStudentFromApi(id as string);
    } catch (error) {
      return res.status(404).json({
        error: "Student not found",
        message: (error as Error).message,
      });
    }

    // 3. check for duplicate attendance
    const alreadyAttended = await hasAttendance(student.card_tag_uid, event.id);
    if (alreadyAttended) {
      return res.status(409).json({
        error: "Duplicate attendance",
        message: "You have already logged attendance for this event",
        student,
        event: {
          id: event.id,
          name: event.event_name,
          code: event.event_code,
          date: event.event_date,
        },
      });
    }

    // 4. save attendance to Supabase
    let attendance;
    try {
      attendance = await saveAttendance(student, event.id);
    } catch (dbError) {
      console.error("Failed to save attendance to Supabase:", dbError);
      return res.status(500).json({
        success: false,
        message: "Student verified but attendance logging failed",
        error: (dbError as Error).message,
        student,
        event: {
          id: event.id,
          name: event.event_name,
          code: event.event_code,
          date: event.event_date,
        },
      });
    }

    // 5. return success response
    return res.json({
      success: true,
      message: "Attendance logged successfully",
      student,
      attendance: {
        id: attendance.id,
        student_id: attendance.student_id,
        student_name: attendance.student_name,
        email_address: attendance.email_address,
        tapped_at: attendance.tapped_at,
        event_id: attendance.event_id,
      },
      event: {
        id: event.id,
        name: event.event_name,
        code: event.event_code,
        date: event.event_date,
      },
    });
  } catch (error) {
    console.error("Error in attendance controller:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: (error as Error).message,
    });
  }
}