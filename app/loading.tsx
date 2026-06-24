import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#050816] flex flex-col items-center justify-center text-white relative overflow-hidden font-sans">
      {/* Background aesthetic blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#14F195]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 blur-xl opacity-30 rounded-full animate-pulse" />
          <Loader2 className="w-12 h-12 animate-spin text-primary relative z-10" />
        </div>
        <div className="flex flex-col items-center space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-white/90 animate-pulse">
            Loading Interface...
          </h2>
          <p className="text-sm text-white/40">
            Connecting to nodes and retrieving data
          </p>
        </div>
      </div>
    </div>
  );
}
