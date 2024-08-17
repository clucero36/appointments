const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-[#9b5d73] before:to-transparent';

export function ServicesSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
    </div>
  );
}


export function ServiceCardSkeleton() {
  return (
    <div className={`${shimmer} overflow-hidden relative border border-[#9b5d73] p-5 hover:border-[#c38b8b] w-2/5 mx-auto `}>

    </div>
  )
}

export function StaffSkeleton() {
  return (
    <div className={`flex flex-col gap-4`}>
      <StaffCardSkeleton />
      <StaffCardSkeleton />
    </div>
  )
}

export function StaffCardSkeleton() {
  return (
    <div className={`${shimmer} overflow-hidden relative border border-[#9b5d73] p-14 w-2/5 mx-auto `}>

    </div>
  )
}

export function TimeSlotCardSkeleton() {
  return (
    <div className={`${shimmer} overflow-hidden relative border border-[#9b5d73] p-2 hover:border-[#c38b8b] basis-28`}>

    </div>
  )
}

export function TimeSlotsSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-4 align-center w-4/5 lg:w-3/5 mx-auto my-4">
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
      <TimeSlotCardSkeleton />
    </div>
  )
}