export function FlightCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-8 w-12 bg-gray-200 rounded-full"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-center space-y-2">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>

            <div className="flex-1 px-6">
              <div className="border-t-2 border-gray-200"></div>
            </div>

            <div className="text-center space-y-2">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        <div className="lg:text-right space-y-3">
          <div className="h-10 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
}

export function HotelCardSkeleton() {
  return (
    <div className="card animate-pulse p-0 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-64 bg-gray-200"></div>
        <div className="md:col-span-2 p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 mt-auto"></div>
        </div>
      </div>
    </div>
  );
}

export function DestinationCardSkeleton() {
  return (
    <div className="card animate-pulse p-0 overflow-hidden">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
}
