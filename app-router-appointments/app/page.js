import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-40 text-center">
      <div className="text-2xl font-bold my-8">Hair Care With Vegan Products</div>
      <div className="flex justify-center gap-4">
        <Link href='/service-details' className='w-20 border border-[#9b5d73] p-1 hover:border-[#c38b8b]'>Services</Link>
        <Link href='/bookable-services' className='w-20 border border-[#9b5d73] p-1 hover:border-[#c38b8b]'>Book</Link>
      </div>
    </div>
  );
}
