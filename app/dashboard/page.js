"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [showAttendanceOptions, setShowAttendanceOptions] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Professor Dashboard</h1>

      <div className="space-y-4">
        {/* Take Attendance Folder (Expands on Click) */}
        <div>
          <button
            onClick={() => setShowAttendanceOptions(!showAttendanceOptions)}
            className="w-full text-left px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Take Attendance
          </button>

          {showAttendanceOptions && (
            <div className="ml-6 mt-2 space-y-2">
              {/* ✅ Match folder name exactly */}
              <Link href="/Take-Attendance/manual">
                <button className="block w-full text-left px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                  Manually
                </button>
              </Link>
              <Link href="/Take-Attendance/image">
                <button className="block w-full text-left px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                  Using Image
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Other Folders (Clickable) */}
        <Link href="/view-attendance">
          <button className="w-full text-left px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            View Attendance
          </button>
        </Link>

        <Link href="/print-attendance">
          <button className="w-full text-left px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Print Attendance
          </button>
        </Link>

        <Link href="/add-class">
          <button className="w-full text-left px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Add Class
          </button>
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="w-full text-left px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
