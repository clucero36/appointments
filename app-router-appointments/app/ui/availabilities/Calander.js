'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calander() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(date) {
    const params = new URLSearchParams(searchParams);
    const today = new Date();
    params.delete('past')
    if (date < today) {
      params.set('past', 'past')
    }
    if (date) {
      params.set('date', date);
    }
    else {
      params.delete('date')
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return <DatePicker inline onSelect={(date) => handleSearch(date)}/>
}