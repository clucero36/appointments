import Link from "next/link"

export default function Header() {
  return (
    <div className="flex justify-between px-6 py-8 md:px-24">
      <Link href='/' className="hover:text-[#9b5d73]">
        <div>Home</div>
      </Link>
      <div className="flex gap-4">
        <Link href='/' className="hover:text-gray-900">
          <div>About</div>
        </Link>
        <Link href='/' className="hover:text-gray-800">
          <div>Contact</div>
        </Link>
      </div>
    </div>
  )
};