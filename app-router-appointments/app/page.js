import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>Hair Care With Vegan Products</div>
      <div>
        <Link href='/service-details'>Services</Link>
        <Link href='/bookable-services'>Book</Link>
      </div>
    </div>
  );
}
