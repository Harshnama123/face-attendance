"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
export default function AddClassPage() {
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const professorId = "professor123"; // Replace with actual professor's ID
  const router = useRouter(); // Initialize router

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ className, subject, professorId }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(`Class added successfully! Class ID: ${data.class._id}`);

      // Redirect to Add Student Page with classId
      router.push(`/add-student?classId=${data.class._id}`);
    } else {
      alert(`Error adding class: ${data.message}`);
    }
  };

  return (
    <div>
      <h1>Add Class</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Enter class name"
          required
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
          required
        />
        <button type="submit">Add Class</button>
      </form>
    </div>
  );
}
