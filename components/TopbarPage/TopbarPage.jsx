// 










export default function Topbar() {
  return (
    <div className="h-16 bg-white shadow flex justify-between items-center px-6 sticky top-0 z-10">
      <div className="font-medium text-lg">Team</div>

      <div className="flex items-center gap-4">
        <span className="text-xl">🔔</span>
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full border"
          alt="avatar"
        />
      </div>
    </div>
  );
}
