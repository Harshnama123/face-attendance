"use client";
import { useState, useEffect } from "react";

export default function ManualAttendance({ classId }) { // Accept classId as a prop
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!classId) return;

    async function fetchStudents() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/students/${classId}`);
        if (!res.ok) throw new Error("Failed to fetch students");

        const data = await res.json();
        setStudents(data.students || []);
      } catch (err) {
        setError("Error fetching students: " + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, [classId]);

  const handleAttendanceChange = (studentId, studentName, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: { studentId, name: studentName, status },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) return alert("Please select a date");

    const attendanceData = Object.values(attendance);
    if (attendanceData.length === 0) return alert("Mark attendance for at least one student");

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, classId, attendance: attendanceData }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Attendance saved successfully!");
        setAttendance({});
        setDate("");
      } else {
        alert(data.error || "Failed to save attendance");
      }
    } catch (err) {
      console.error("Error submitting attendance:", err);
      alert("Failed to save attendance");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Mark Attendance</h1>

      <label style={{ display: "block", marginBottom: "10px" }}>
        <strong>Select Date:</strong>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>

      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <select
                      onChange={(e) => handleAttendanceChange(student._id, student.name, e.target.value)}
                      value={attendance[student._id]?.status || ""}
                    >
                      <option value="">Select</option>
                      <option value="P">Present</option>
                      <option value="A">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" style={{ marginTop: "10px" }}>Submit Attendance</button>
        </form>
      )}
    </div>
  );
}
