"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddStudent from "@/app/AddStudent"; // Adjust import path if needed

const ClassDetailsPage = ({ params }) => {
  const { classId } = params; // Extract classId from URL
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const res = await fetch(`/api/class/${classId}`);
        const data = await res.json();
        if (res.ok) {
          setClassData(data);
        } else {
          console.error("Failed to fetch class data");
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    if (classId) fetchClassData();
  }, [classId]);

  return (
    <div>
      {classData ? (
        <>
          <h1>Class: {classData.className}</h1>
          <h2>Subject: {classData.subject}</h2>
          <h3>Students:</h3>
          <ul>
            {classData.students.map((student) => (
              <li key={student._id}>{student.name} - {student.email}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading class details...</p>
      )}

      {/* Pass classId to AddStudent component */}
      <AddStudent classId={classId} />
    </div>
  );
};

export default ClassDetailsPage;
