export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      {children} {/* Only show sign-in content */}
    </div>
  );
}
