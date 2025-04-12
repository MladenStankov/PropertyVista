import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center space-y-6">
        <Image
          src="/logo.svg"
          alt="PropertyVista Logo"
          width={200}
          height={200}
          className="mx-auto mb-6"
        />

        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700">Page Not Found</h2>

        <p className="text-gray-600 text-lg">
          We couldn&apos;t find the page you&apos;re looking for. It might have
          been moved, deleted, or never existed.
        </p>

        <div className="space-y-4">
          <Link href="/" className="block">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Return Home
            </button>
          </Link>

          <Link href="/listings" className="block">
            <button className="w-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors">
              Browse Properties
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
