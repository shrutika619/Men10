// 










"use client";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow h-screen p-4">
      <h2 className="text-xl font-bold mb-6">MEN10</h2>

      <nav className="space-y-3">
        <a href="/dashboard" className="block hover:text-blue-600">Dashboard</a>
        <a href="/dashboard/team" className="block hover:text-blue-600">Team</a>
        <a href="/dashboard/admin" className="block hover:text-blue-600">Admin</a>
        <a href="/dashboard/super" className="block hover:text-blue-600">Super Admin</a>
      </nav>
    </aside>
  );
}
