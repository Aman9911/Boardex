import { Skeleton } from "../ui/skeleton"

const CustomSkeleton = () => {
  return (
    <div className="w-full min-h-screen">
      <h1 className="text-center pt-5 font-serif text-3xl font-bold tracking-tight text-gray-900">
        Board Tasks
      </h1>
    <div className="flex flex-col md:flex-row gap-5 m-2 md:m-10 ">
      {/* Boards Section */}
      <div className="rounded-xl border border-gray-300 p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-32" /> 
          <Skeleton className="h-9 w-28 rounded-full" /> 
        </div>

        <div className="space-y-4 h-[calc(100vh-18rem)]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-300 p-4 space-y-2">
              <Skeleton className="h-5 w-48" /> 
              <Skeleton className="h-4 w-56" /> 
              <Skeleton className="h-3 w-40" /> 
            </div>
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <div className="rounded-xl border border-gray-300 p-6 w-full">
        <div className="flex justify-between gap-2 items-center mb-4">
          <Skeleton className="h-6 w-44" /> 
          <Skeleton className="h-9 w-28 rounded-full" /> 
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-300 p-4 space-y-3">
              <Skeleton className="h-5 w-56" /> 
              <div className="flex justify-between ">
              <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-52" />
              </div>
              <div className="md:flex flex-col gap-2 hidden">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>

  )
}

export default CustomSkeleton