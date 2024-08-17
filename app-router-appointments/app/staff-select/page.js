import Staff from "../ui/staff-select/Staff";
import { Suspense } from "react";
import { StaffSkeleton } from "../ui/skeletons";

export default function Page({ searchParams }) {

  return (
    <main>
      <div className='text-2xl font-bold my-8'>Select Your Stylist</div>
      <Suspense fallback={<StaffSkeleton />}>
        <Staff serviceId={searchParams.serviceId} />
      </Suspense>
    </main>
  )
}