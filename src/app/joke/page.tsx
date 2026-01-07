

/* async function getJoke() {
  const res = await fetch("https://api.chucknorris.io/jokes/random");
  return await res.json()
} */


  import { getJoke } from "../services/jokes";

  export default async function JokePage() {
    const data = await getJoke();

    return (
    <>
    <h1>{data.value}</h1>
    </>
 ) 
}

/* export default async function JokePage() {
  const res = await fetch("https://api.chucknorris.io/jokes/random");
  const data = await res.json();

  return (
  <h1>{data.value}</h1>
) 
} */