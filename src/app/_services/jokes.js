

export async function getJoke() {
  const res = await fetch("https://api.chucknorris.io/jokes/random", { next: { revalidate: 10 } });
  if (!res.ok) {
    throw new Error("Failed to fetch joke");
  } 
  return await res.json()
}