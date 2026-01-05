# Data Fetching i Next.js

I React bruger man ofte useEffect og fetch i browseren til at hente data.
Men i Next.js henter man data på serveren, hvilket er både hurtigere og mere sikkert.

## 1. Data-fetched på serveren (ikke i browseren)
I Next.js er sider som udgangspunkt Server Components.
Det betyder, at du kan hente data direkte: 

export default async function Page() {
  const res = await fetch("https://api.example.com");
  const data = await res.json();

  return <h1>{data.title}</h1>;
}
 
 
Der er ingen brug for useEffect.
Data er klar før siden sendes til brugeren.

Fordele:

hurtigere sider

mere sikker håndtering af API-nøgler

ingen loading states nødvendige (i mange tilfælde)

## 2. Next.js cacher automatisk dine fetch-kald
Når du laver et fetch i en Server Component, cacher Next.js svaret som standard.

Eksempel:

await fetch("https://api.example.com");
 
 
Dette betyder:

fetch’ens svar gemmes

næste gang siden vises, bruger Next.js cachen

fetch kaldes ikke igen (medmindre du selv siger det)

Caching giver:

hurtige sider

færre API-kald

mindre server-belastning

## 3. Styr caching med "revalidate"
Hvis data skal opdateres regelmæssigt, kan du fortælle Next.js det:

await fetch(url, { next: { revalidate: 10 } });
 
 
Det betyder:

HTML-siden gemmes

hvert 10. sekund må Next.js genopbygge siden

Det kaldes Incremental Static Regeneration (ISR).

## 4. Force Dynamiske fetches (SSR)
Nogle sider må ikke bruge cached data.
Derfor kan du slå caching fra:

await fetch(url, { cache: "no-store" });
 
 
Dette giver:

altid friske data

server-side rendering (SSR) hver gang

## 5. Server Actions (POST uden API-rute)
Server Actions gør det muligt at sende data til serveren uden at lave en API-rute.

Eksempel på en Server Action:

"use server"

export async function saveName(formData) {
  const name = formData.get("name");
  console.log("Navn modtaget:", name);
}
 
 
Bruges i en form:

<form action={saveName}>
  <input name="name" />
  <button type="submit">Gem</button>
</form>

# Øvelse 1: Lav en Server Component der henter data

- Opret: app/joke/page.tsx
- Indsæt: 
export default async function JokePage() {
  const res = await fetch("https://api.chucknorris.io/jokes/random");
  const data = await res.json();

  return <p>{data.value}</p>;
}

## 1. Hvilken renderingstype er dette?
- Renderingsstrategi: SSR (Server-Side Rendering)

## 2. Hvorfor?
- Siden henter data ved hvert request fra API’et
fetch bruges uden caching eller build-time, så HTML genereres dynamisk på serveren hver gang, inden den sendes til browseren
Det er ikke SSG (statisk) eller ISR (statisk med revalidate), fordi indholdet ændrer sig for hvert request

# Øvelse 2: Brug revalidate til at lave ISR

- Opret: app/facts/page.tsx
- Indsæt: 
export default async function FactsPage() {
  const res = await fetch("https://catfact.ninja/fact", {
    next: { revalidate: 5 }
  });
  const data = await res.json();

  return <p>{data.fact}</p>;
}

## 1. Hvad sker der?
- Når du reload siden flere gange hurtigt:
Cat fact ændrer sig ikke
Next.js serverer den statisk cachede version, fordi revalidate-tiden (5 sek.) endnu ikke er overskredet
Når du venter 5+ sekunder og reload:
Cat fact ændrer sig
Next.js genhenter data fra API’et og opdaterer den statiske side
Siden bliver opdateret uden at hele build-processen køres igen

## 2. Forklaring?
- ISR (Incremental Static Regeneration):
Kombinerer SSG og dynamisk opdatering
Siden genereres statisk, men kan automatisk revalideres efter det angivne interval (revalidate: 5)
Fordel: Hurtig statisk levering + opdatering uden fuld rebuild

Før intervallet er nået → statisk cached version vises (samme fact)
Efter intervallet er nået → ny version hentes fra API’et (fact ændrer sig)
Perfekt til sider med ofte skiftende data, men hvor man stadig vil have hurtig load og SEO-optimering

# Øvelse 3: Lav din første Server Action

- Opret: app/actions-demo/page.tsx
         app/actions-demo/action.ts

Note: Hvorfor server actions skal være .ts
Server Actions er funktioner, ikke komponenter.
Hvis du gemmer dem i .tsx, tror Next.js, at filen er en React-komponent, og App Router prøver at lave en route ud af filen.
Resultatet bliver typisk:
404 når du prøver at kalde action fra en <form>
Build fejl hvis du prøver 'use server' + 'use client'
Ved at bruge .ts:
Next.js forstår, at filen kun indeholder serverlogik
Den bliver ikke behandlet som en side/route

- Indsæt: 
"use server"

export async function saveMessage(formData) {
  const msg = formData.get("message");
  console.log("Besked modtaget:", msg);
}

- Brug den i en form: 
<form action={saveMessage}>
  <input name="message" placeholder="Skriv en besked" />
  <button type="submit">Send</button>
</form>

## Hvorfor er dette smartere end et POST API endpoint?
Du behøver ikke oprette et separat API-endpoint
Server Action håndteres direkte fra komponenten → mindre boilerplate
Data håndteres sikkert på serveren uden at eksponere logik eller nøgler i browseren
Server Actions fungerer tæt integreret med App Router, så formularer og serverlogik kan være i samme mappe
Perfekt til simple formularer, hvor du vil skrive data eller logge beskeder uden at lave ekstra routes

### Kort huskeregel

Server Action = server-side funktioner
Client Component = interaktivt UI i browseren
Aldrig 'use client' + 'use server' i samme fil