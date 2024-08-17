import Link from "next/link";

const url = 'https://us-central1-appointments-a917d.cloudfunctions.net/getCatalogServices';

export default async function ServicesCards() {

  const reviver = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' ? BigInt(value) : value;
  var data;

  try {
    // console.log('Fetching Service data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const res = await fetch(url);

    if (!res.ok) 
      throw new Error(`Response status: ${res.status}`);

    data = await res.json();
  }
  catch (error) {
    console.error(error.message);
  }

  const services = JSON.parse(data.items, reviver);
  return (
    <div className="flex flex-col gap-4">
      {
        services.map((service) => {
          return (
            <Link className="w-2/5 mx-auto" key={service.id} href={{
              pathname: '/staff-select',
              query: {
                serviceId: `${service.id}`,
              }
            }}>
              <div className="border border-[#9b5d73] p-2 hover:border-[#c38b8b]">
                {service.itemData.name}
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}