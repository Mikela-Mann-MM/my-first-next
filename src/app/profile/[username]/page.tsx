interface ProfilePageProps {
  params: {
    username: string;
  };
} 

export default async function Profile({ params }: ProfilePageProps) {
  return (
    <h1>Profil for: {(await params).username}</h1> // paranteses omkring await er nødvendige, da det skal afvikles først
  );
}

/* 3. Noter – Hvad ændrer sig og hvorfor?

Dynamisk routing:

[username] i mappenavnet gør URL-delen dynamisk

Next.js “fanger” værdien fra URL’en og sender den som params.username

Hvad ændrer sig på siden:

Overskriften <h1> viser navnet fra URL’en

/profile/alex → “Profil for: alex”

/profile/spiderman → “Profil for: spiderman”

Hvorfor:

Next.js App Router bruger filnavnet [slug] til dynamiske parametre

params objektet indeholder alle URL-parametre for den aktuelle route

Du kan bruge async hvis du vil hente data baseret på username */