
import Services from "../ui/bookable-services/Services";
import { Suspense } from "react";
import { ServicesSkeleton } from "../ui/skeletons";

export default function Page() {

  return (
    <main>
      <div className='text-2xl font-bold my-8'>Select a Service</div>
      <Suspense fallback={<ServicesSkeleton />} >
        <Services />
      </Suspense>
    </main>
  )
}