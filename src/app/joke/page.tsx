export default async function JokePage() {
  const res = await fetch("https://api.chucknorris.io/jokes/random");
  const data = await res.json();

  return <p>{data.value}</p>;
}