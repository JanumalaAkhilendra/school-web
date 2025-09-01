// src/app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to School Directory</h1>
      <div className="flex gap-4">
        <Link href="/add-school" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add School
        </Link>
        <Link href="/show-schools" className="bg-green-600 text-white px-4 py-2 rounded">
          Show Schools
        </Link>
      </div>
    </div>
  );
}
