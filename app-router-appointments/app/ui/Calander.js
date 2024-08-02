'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function Calander() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(date) {
    const params = new URLSearchParams(searchParams);
    if (date) {
      params.delete('date');
      params.set('date', date);
    }
    else {
      params.delete('date')
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      Calander
      <button onClick={() => handleSearch('date1')}>date1</button>
      <button onClick={() => handleSearch('date2')}>date2</button>
    </div>
  )
}