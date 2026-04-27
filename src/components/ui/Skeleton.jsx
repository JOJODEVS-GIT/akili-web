/**
 * Skeleton — placeholder pulsant pendant le chargement.
 * Usage : <Skeleton className="h-8 w-32" />
 */
import { cn } from '@/lib/cn';

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-akili-papyrus-deep rounded-md',
        className
      )}
    />
  );
}

/** PageSkeleton — fallback pour Suspense lazy-load des routes */
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-akili-papyrus flex flex-col items-center justify-center gap-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

/** StatCardSkeleton */
export function StatCardSkeleton() {
  return (
    <div className="bg-white border border-akili-line rounded-akili p-6">
      <div className="flex items-center gap-2.5">
        <Skeleton className="w-8 h-8 rounded-md" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-8 w-20 mt-4" />
    </div>
  );
}

/** TableRowSkeleton */
export function TableRowSkeleton() {
  return (
    <div className="px-5 py-3.5 flex items-center gap-4 border-b border-akili-line">
      <Skeleton className="w-9 h-9 rounded-akili" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-2 w-32" />
      </div>
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}
