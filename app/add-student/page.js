"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AddStudentPage() {
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId"); // Get classId from URL
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging logs
    console.log("Sending request to /api/student");
    console.log("Payload:", { name: studentName, email: studentEmail, classId });

    const response = await fetch("/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: studentName, email: studentEmail, classId }), // Correct field names
    });

    const data = await response.json();

    console.log("Response:", data);

    if (response.ok) {
      alert(`Student ${studentName} added successfully!`);
      setStudentName("");
      setStudentEmail("");
    } else {
      alert(`Error adding student: ${data.message}`);
    }
  };

  return (
    <div>
      <h1>Add Student to Class</h1>
      <p>Class ID: {classId}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter student name"
          required
        />
        <input
          type="email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          placeholder="Enter student email"
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
