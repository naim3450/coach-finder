import { Card, CardContent, CardHeader } from "@/Components/ui/card";

export default function LoadingSkeleton() {
  return (
    <Card className="w-[400px] overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          {/* Profile image skeleton */}
          <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />

          <div className="flex-1 space-y-2">
            {/* Name skeleton */}
            <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
            {/* Location skeleton */}
            <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
            {/* Rating skeleton */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 bg-muted animate-pulse rounded"
                />
              ))}
              <div className="h-4 w-24 bg-muted animate-pulse rounded ml-2" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Meeting format section */}
        <div className="space-y-2">
          <div className="h-5 w-32 bg-muted animate-pulse rounded" />
          <div className="flex gap-3">
            <div className="h-5 w-24 bg-muted animate-pulse rounded" />
            <div className="h-5 w-36 bg-muted animate-pulse rounded" />
          </div>
        </div>

        {/* Description placeholder */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 w-24 bg-muted animate-pulse rounded" />
          ))}
        </div>

        {/* Price and button */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
          <div className="h-9 w-28 bg-muted animate-pulse rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
