import CountyList from "@/components/County/CountyList";

// Generate segments for [category]
export async function generateStaticParams() {
  const counties = await fetch(
    `${process.env.REACT_APP_API_URL}/api/counties`
  ).then((res) => res.json());

  return counties.counties.map((county) => ({
    county: county,
  }));
}

function PropertyPage(props) {
  return (
    <>
      <CountyList {...props} />
    </>
  );
}

export default PropertyPage;
