import { Link } from "react-router-dom";
import { Home, ArrowLeft, Film, ShieldAlert } from "lucide-react";

export default function PathNotFound() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.15),transparent_35%)]" />
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-500 blur-[140px]" />
      </div>
      <div className="relative z-10 max-w-3xl w-full">
        <div className="rounded-4xl border border-red-500/20 bg-white/5 backdrop-blur-2xl p-8 md:p-14 shadow-[0_0_60px_rgba(255,0,0,0.15)]">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 shadow-lg shadow-red-500/10">
              <ShieldAlert size={44} className="text-red-500" />
            </div>
            <div className="text-7xl md:text-9xl font-black tracking-tight bg-linear-to-b from-white to-red-500 bg-clip-text text-transparent leading-none">
              404
            </div>
            <h1 className="mt-6 text-3xl md:text-5xl font-black tracking-tight">
              LOST IN THE CINEMA
            </h1>
            <p className="mt-4 text-white/50 text-sm md:text-base max-w-xl leading-relaxed">
              The page you are looking for does not exist or has been moved.
              Maybe the route was deleted, renamed or you entered the wrong
              address.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <div className="flex items-center gap-3 mb-3">
                <Film className="text-red-400" />
                <h2 className="font-bold text-lg">Movie System</h2>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Your requested route is unavailable inside the admin movie
                management system.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <div className="flex items-center gap-3 mb-3">
                <ShieldAlert className="text-red-400" />
                <h2 className="font-bold text-lg">Route Error</h2>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Check the URL path or return to the dashboard to continue using
                the platform safely.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              to="/settingslistmovie"
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-red-600 hover:bg-red-500 transition px-6 py-4 font-bold shadow-lg shadow-red-500/20"
            >
              <Home size={20} />
              Back Dashboard
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition px-6 py-4 font-bold"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-white/30 tracking-wide">
            ADMIN MOVIE SYSTEM • ERROR 404
          </div>
        </div>
      </div>
    </div>
  );
}
