  'use server'  // Server action skal køre på serveren

import { success, z } from "zod"; // til validering af data

export async function saveMessage(prevState, formData ) {
  
  console.log("prevState i action:", prevState);

/* const formData = new FormData();
formData.append("name", "John Doe"); //dette er det der sker under kølerhjelmen */

  const values = Object.fromEntries(formData) // fromData er et objekt med en masse entries

  console.log("konstrueret objekt:", values)
  console.log(values.name)

  // valider med Zod!! - hvorfor valiedere vi en form.
const schema = z.object({
    name: z.string().min(2, "Navn skal være mindst 2 karakterer langt"),
    //email: z.string().email("Ugyldig email adresse"),
    message: z.string().min(5, "Besked skal være mindst 5 karakterer langt")
  });

  //1 trin i validering - vi starter med at lave et skema som bestemmer hvordan dataen skal se ud



  const validated = schema.safeParse({
    name: values.name,
    message: values.message
  })

  //2 trin - vi sammenligner skemaet med de indtastede værdier.

  if (!validated.success) {
    return {
      success: false, // validering fejlede
      data: values, // tilføj de oprindelige værdier til validated objektet
      error: z.treeifyError(validated.error) // omformater fejl objektet for nemmere brug på klienten
    };
  }

  //3 trin kigge på det validerede objekt - hvis det fejler, så returner fejl til klienten

  //tjek om data er ændret

    //er der sket ændringer i formularen siden sidste submit?
  if (values.name === prevState.data.name && values.message === prevState.data.message ) {
    console.log("Ingen ændringer i data, spring lagring over");
    return {
      data: values,
      success: true
    }; // returner tidligere state uden ændringer
  }

  // Hvorfor validering?

  //  - undgå brugerfejl - tastefejl. Alt bruger input skal altid valideres 
  //  af 3 årsager: 1. bruger kan være ondsindet
  // 2. hjælpe brugeren med at udfylde formen korrekt. 
  // 3. data integritet - dataen skal gemmes et sted - måske sendes vha et post request til 
  // et API - hvis dataen er forkert formateret kan det ødelægge databasen.
  // - sikkerhed - undgå ondsindet kode ex ;DROP TABLE USERS; --

  console.log("Kald til APIet");

  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    // Auth token her hvis nødvendigt
    body: JSON.stringify( validated.data)
  });

  if (!res.ok) {  
    throw new Error("Fejl ved lagring af besked");
  }

  // redirect eller revalidate cache hvis nødvendigt
  /* console.log("Besked modtaget:", msg); */
  return validated; // returner success med de validerede data

}
