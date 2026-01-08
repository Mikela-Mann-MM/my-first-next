 export const dynamic = "force-dynamic";

export default async function TimePage() {
  const res = await fetch("https://worldtimeapi.org/api/timezone/Europe/Copenhagen");
  
  const data = await res.json()

  return (
  <h1>Tiden er: {data.datetime}</h1>
)
} 

