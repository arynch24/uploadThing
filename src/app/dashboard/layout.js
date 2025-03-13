import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import ProtectedRoute from "../../components/Dashboard/ProtectedRoute";
export default function Layout({ children }) {
  return (
    <ProtectedRoute>
      <div className="bg-black px-20">
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 bg-black text-white p-6">{children}</main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
