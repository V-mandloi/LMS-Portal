import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-white">
        Welcome to LMS Portal
      </h1>
      <p className="text-lg text-white">Learn anytime, anywhere!</p>
      <div className="mt-6 flex gap-4">
        <Link href="/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Get Started
          </button>
        </Link>
        <Link href="/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Become Partner
          </button>
        </Link>
      </div>
    </div>
  );
}
