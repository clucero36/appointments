

export default function ServiceCard({service, description}) {
  
  return (
    <div className="bg-[#c38b8b] rounded-md p-4">
      <p className="text-xl mb-2 font-bold border-b border-[#9b5d73]">{service}</p> 
      <div className="border-b border-[#9b5d73]">
        <p className="text-sm mx-auto mt-0 mb-2 ">{description}</p>
      </div>
    </div>
  )
}