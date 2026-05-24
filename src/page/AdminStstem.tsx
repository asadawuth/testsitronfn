import { useEffect } from "react";
import {
  Monitor,
  Smartphone,
  ShieldCheck,
  ShieldX,
  CalendarDays,
  User,
  Crown,
  Clock3,
} from "lucide-react";
import Pagination from "../conponent/ui/Pagination";
import { observer } from "mobx-react-lite";
import { authStore } from "../store/authStore";

const AdminSystem = observer(() => {
  useEffect(() => {
    authStore.usersystem(authStore.page);
  }, []);
  const activeCount = authStore.users.filter((u) => !u.is_revoked).length;
  const revokedCount = authStore.users.filter((u) => u.is_revoked).length;

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-zinc-950 to-black text-white p-4 md:p-8">
      <div className="relative overflow-hidden rounded-4xl border border-red-500/20 bg-linear-to-br from-red-950/40 via-black to-zinc-950 p-6 md:p-8 shadow-[0_0_80px_rgba(255,0,0,0.08)] mb-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.18),transparent_35%)]" />
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full text-red-400 text-xs font-semibold tracking-wider mb-5">
              ADMIN CONTROL PANEL
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
              Session Monitor
            </h1>
            <p className="text-white/50 mt-4 max-w-2xl text-sm md:text-base leading-relaxed">
              Track authenticated users, monitor active devices and control
              revoked sessions across the movie platform system.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="bg-black/50 border border-white/10 rounded-3xl px-6 py-5 min-w-42.5 backdrop-blur-xl">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">
                Active Sessions
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <ShieldCheck className="text-green-400" size={20} />
                </div>
                <span className="text-4xl font-black text-green-400">
                  {activeCount}
                </span>
              </div>
            </div>
            <div className="bg-black/50 border border-white/10 rounded-3xl px-6 py-5 min-w-42.5 backdrop-blur-xl">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">
                Revoked
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <ShieldX className="text-red-400" size={20} />
                </div>
                <span className="text-4xl font-black text-red-400">
                  {revokedCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-4xl border border-white/10 bg-white/3 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.05)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 md:px-8 py-6 border-b border-white/10 bg-linear-to-r from-red-950/10 to-transparent">
          <div>
            <h2 className="text-2xl font-black">Login Sessions</h2>
            <p className="text-white/40 text-sm mt-1">
              Latest authentication activity and connected devices
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-red-400 text-sm font-bold tracking-wide">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE MONITORING
          </div>
        </div>

        {authStore.loading ? (
          <div className="h-100 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-red-500/10 border-t-red-500 rounded-full animate-spin mb-5" />
            <p className="text-white/50 text-sm tracking-wide">
              Loading authentication sessions...
            </p>
          </div>
        ) : (
          <>
            <div className="hidden xl:grid grid-cols-[1.2fr_0.8fr_2fr_1fr_1fr_1fr] gap-4 px-8 py-5 border-b border-white/10 bg-white/2 text-white/40 text-xs uppercase tracking-[0.2em] font-semibold">
              <div>User</div>
              <div>Role</div>
              <div>Device</div>
              <div>Status</div>
              <div>Created</div>
              <div>Expires</div>
            </div>
            <div className="divide-y divide-white/5">
              {authStore.users.map((item, index) => (
                <div
                  key={index}
                  className="group px-4 md:px-8 py-5 hover:bg-red-500/3 transition-all duration-300"
                >
                  <div className="hidden xl:grid grid-cols-[1.2fr_0.8fr_2fr_1fr_1fr_1fr] gap-4 items-center">
                    {/* USER */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-red-500/20 to-red-700/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <User size={20} className="text-red-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-white truncate">
                          User #{item.user_id}
                        </h3>
                        <p className="text-white/40 text-xs mt-1">
                          Authenticated Account
                        </p>
                      </div>
                    </div>
                    <div>
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs font-bold tracking-wide ${
                          item.role === "ADMIN"
                            ? "bg-red-500/10 border-red-500/20 text-red-400"
                            : "bg-white/3 border-white/10 text-white/70"
                        }`}
                      >
                        <Crown size={14} />
                        {item.role}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-11 h-11 rounded-2xl bg-white/3 border border-white/10 flex items-center justify-center shrink-0">
                        {item.device?.includes("Mobile") ? (
                          <Smartphone size={18} className="text-white/60" />
                        ) : (
                          <Monitor size={18} className="text-white/60" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white/80 text-sm truncate">
                          {item.device || "Unknown Device"}
                        </p>
                        <p className="text-white/30 text-xs mt-1">
                          Connected Device
                        </p>
                      </div>
                    </div>
                    <div>
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-black tracking-wider ${
                          item.is_revoked
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : "bg-green-500/10 text-green-400 border-green-500/20"
                        }`}
                      >
                        <div className="w-2 h-2 rounded-full bg-current" />
                        {item.is_revoked ? "REVOKED" : "ACTIVE"}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center gap-2 text-white/80">
                        <CalendarDays size={14} className="text-red-400" />
                        {item.created_at.slice(0, 10)}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center gap-2 text-white/60">
                        <Clock3 size={14} className="text-orange-400" />
                        {item.expires_at?.slice(0, 10)}
                      </div>
                    </div>
                  </div>
                  <div className="xl:hidden rounded-3xl border border-white/10 bg-black/30 p-5">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-red-500/20 to-red-700/10 border border-red-500/20 flex items-center justify-center">
                          <User size={20} className="text-red-400" />
                        </div>
                        <div>
                          <h3 className="font-black text-lg">
                            User #{item.user_id}
                          </h3>
                          <div
                            className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-xl border text-xs font-bold ${
                              item.role === "ADMIN"
                                ? "bg-red-500/10 border-red-500/20 text-red-400"
                                : "bg-white/3 border-white/10 text-white/70"
                            }`}
                          >
                            <Crown size={12} />
                            {item.role}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-2 rounded-xl text-xs font-black tracking-wider ${
                          item.is_revoked
                            ? "bg-red-500/10 text-red-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {item.is_revoked ? "REVOKED" : "ACTIVE"}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/3 border border-white/10 flex items-center justify-center shrink-0">
                          {item.device?.includes("Mobile") ? (
                            <Smartphone size={16} className="text-white/60" />
                          ) : (
                            <Monitor size={16} className="text-white/60" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                            Device
                          </p>
                          <p className="text-white/80 text-sm break-all">
                            {item.device || "Unknown Device"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                          <CalendarDays size={16} className="text-red-400" />
                        </div>
                        <div>
                          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                            Created
                          </p>
                          <p className="text-white/80 text-sm">
                            {item.created_at.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                          <Clock3 size={16} className="text-orange-400" />
                        </div>
                        <div>
                          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                            Expires
                          </p>
                          <p className="text-white/70 text-sm">
                            {item.expires_at?.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 md:p-8 border-t border-white/10 bg-black/20">
              <Pagination
                page={authStore.page}
                totalPages={authStore.totalPages}
                onPageChange={(page) => {
                  authStore.setPage(page);
                  authStore.usersystem(page);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default AdminSystem;
