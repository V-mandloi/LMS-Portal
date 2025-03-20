import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to LMS Portal</h1>
      <p className="text-lg text-gray-600">Learn anytime, anywhere!</p>
      <Link href="/courses">
        <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Browse Courses
        </button>
      </Link>
    </div>
  );
}
