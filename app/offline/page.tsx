"use client";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F7F9] dark:bg-gray-950 px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🚗</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">You&apos;re offline</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          No internet connection. Please check your network and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#3563E9] hover:bg-[#2a52c9] transition-colors text-white font-semibold px-8 py-3 rounded-[4px]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
