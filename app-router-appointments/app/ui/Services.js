import Link from "next/link";

const url = 'https://us-central1-appointments-a917d.cloudfunctions.net/getCatalogServices';
const reviver = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' ? BigInt(value) : value;

export default async function Services() {

  var data;

  try {
    const res = await fetch(url);

    if (!res.ok) 
      throw new Error(`Response status: ${res.status}`);

    data = await res.json();

  }
  catch (error) {
    console.error(error.message);
  }

  const services = JSON.parse(data.items, reviver);
  let renderedServices = services.map((service) => {
    return (
      <div key={service.id}>
        <Link href={{
          pathname: '/staff-select',
          query: {
            serviceId: `${service.id}`,
          }
        }}>
          <div>{service.itemData.name}</div>
        </Link>
      </div>
    )
  });

  return (
    <div>
      {renderedServices}
    </div>
  )
}