import Link from "next/link"

export default function Header() {
  return (
    <div className="flex justify-between px-6 py-8 md:px-24 md:py-12">
      <Link href='/'>
        <div>Home</div>
      </Link>
      <div className="flex gap-4">
        <Link href=''>
          <div>About</div>
        </Link>
        <Link href=''>
          <div>Contact</div>
        </Link>
      </div>
    </div>
  )
};