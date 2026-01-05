export default async function FactsPage() {
  const res = await fetch("https://catfact.ninja/fact", {
    next: { revalidate: 5 }
  });
  const data = await res.json();

  return <p>{data.fact}</p>;
}