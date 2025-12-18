export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse" role="status" aria-live="polite">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
                <div className="w-full aspect-[3/4] rounded-2xl bg-slate-800/70" />
                <div className="space-y-3">
                    <div className="h-10 w-2/3 rounded-lg bg-slate-800/70" />
                    <div className="space-y-2">
                        <div className="h-3 w-full rounded bg-slate-800/70" />
                        <div className="h-3 w-11/12 rounded bg-slate-800/70" />
                        <div className="h-3 w-10/12 rounded bg-slate-800/70" />
                    </div>
                    <div className="flex gap-2">
                        <div className="h-6 w-24 rounded-full bg-slate-800/70" />
                        <div className="h-6 w-32 rounded-full bg-slate-800/70" />
                    </div>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-56 rounded-2xl bg-slate-800/70" />
                ))}
            </div>
        </div>
    );
}