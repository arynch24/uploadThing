export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      {children} {/* Only show sign-in content */}
    </div>
  );
}
