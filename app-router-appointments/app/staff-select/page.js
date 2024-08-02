import Staff from "../ui/Staff"

export default function Page({ searchParams }) {

  return (
    <div>
      Staff Select Page
      <Staff serviceId={searchParams.serviceId} />
    </div>
  )
}