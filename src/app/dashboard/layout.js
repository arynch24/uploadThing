export default function DashboardLayout({ children }) {
    return (
      <div className="flex">
        <aside className="w-64 bg-gray-200 p-4">Sidebar</aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    );
  }
  