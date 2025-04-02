"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function AddStudent() {
  const { classId } = useParams();
  const [studentEmail, setStudentEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/class/add-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ classId, studentEmail }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Student added successfully!");
      setStudentEmail("");
    } else {
      setMessage(data.message || "Error adding student");
    }
  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          placeholder="Enter student email"
          required
        />
        <button type="submit">Add Student</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
