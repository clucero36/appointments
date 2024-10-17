
import Services from "@/app/ui/bookable-services/Services";
import { Suspense } from "react";
import { ServicesSkeleton } from "@/app/ui/skeletons";

export default function Page() {

  return (
    <main>
      <div className='text-2xl font-bold mt-6 mb-5'>Select Your Service & Staff</div>
      <Suspense fallback={<ServicesSkeleton />} >
        <Services />
      </Suspense>
    </main>
  )
}