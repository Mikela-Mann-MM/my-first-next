 

export async function saveMessage(formData: FormData) {
  'use server'  // Server action skal køre på serveren
  const msg = formData.get("message"); //tidligere hvor vi ikke brugte next await e.formData()
  const values = Object.fromEntries(formData)
  console.log("konstrueret objekt:", values)
  console.log(values.name)

  // valider med Zod!!

  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    // Auth token her hvis nødvendigt
    body: JSON.stringify({ message: msg })
    
  });

  if (!res.ok) {  
    throw new Error("Fejl ved lagring af besked");
  }

  // redirect eller revalidate cache hvis nødvendigt
  console.log("Besked modtaget:", msg);
  console.log("Response:", res);
}
