import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 py-6 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 space-y-4 md:space-y-0">
        <p>
          &copy; {new Date().getFullYear()} Recipe Sharing. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-pink-500 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-purple-500 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-500 transition">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
