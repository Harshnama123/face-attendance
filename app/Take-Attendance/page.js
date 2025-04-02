"use client";
import { useRouter } from "next/navigation";

export default function TakeAttendance() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Take Attendance</h1>
      <div className="mt-6 flex flex-col gap-4">
        <button onClick={() => router.push("/take-attendance/manual")} className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
          Manually
        </button>
        <button onClick={() => router.push("/take-attendance/image")} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Using Image
        </button>
      </div>
    </div>
  );
}
