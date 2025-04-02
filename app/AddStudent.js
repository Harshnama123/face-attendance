"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AddStudentPage() {
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId"); // Get classId from URL
  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: studentName,  // Change "studentName" to "name"
        email: rollNumber,  // Change "rollNumber" to "email" (or add rollNumber in schema)
        classId,
      }),
    });
  
    const data = await response.json();
    if (response.ok) {
      alert(`Student ${studentName} added successfully!`);
      setStudentName("");
      setRollNumber("");
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
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter roll number"
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
