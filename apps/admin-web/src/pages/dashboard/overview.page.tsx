import { useAuthStore } from '@org/authentication';

export function OverviewPage() {
  const clear = useAuthStore(state => state.clear);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Dashboard Overview</h1>
      <button 
        onClick={clear}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Test Logout (Clear Session)
      </button>
    </div>
  );
}
