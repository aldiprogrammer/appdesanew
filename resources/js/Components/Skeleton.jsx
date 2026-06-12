export function SkeletonLine({ className = '' }) {
    return <div className={`h-4 w-full rounded bg-gray-200 animate-pulse ${className}`} />;
}

export function SkeletonCard({ className = '' }) {
    return (
        <div className={`rounded-xl border border-gray-100 bg-white p-5 shadow-sm ${className}`}>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 animate-pulse md:h-14 md:w-14" />
            <div className="h-3 w-3/4 mx-auto rounded bg-gray-200 animate-pulse" />
        </div>
    );
}

export function SkeletonListItem({ className = '' }) {
    return (
        <div className={`rounded-xl border border-gray-100 bg-white p-4 shadow-sm md:p-5 ${className}`}>
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-200 animate-pulse md:h-10 md:w-10" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
                    <div className="h-3 w-1/4 rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
            </div>
        </div>
    );
}

export function SkeletonProfileCard({ className = '' }) {
    return (
        <div className={`rounded-2xl bg-white p-6 shadow-sm border border-gray-100 ${className}`}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gray-200 animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-5 w-40 rounded bg-gray-200 animate-pulse" />
                        <div className="h-3 w-56 rounded bg-gray-200 animate-pulse" />
                    </div>
                </div>
                <div className="h-8 w-28 rounded-lg bg-gray-200 animate-pulse" />
            </div>
        </div>
    );
}
