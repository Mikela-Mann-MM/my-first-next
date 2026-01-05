### Server	HTML + data genereres på serveren, sendes færdigt til browser	Server Component / SSR / SSG
### Browser	HTML + interaktivitet håndteres på brugerens computer	Client Component / CSR

# Next.js – Typer af komponenter og rendering

## 1. Server Component
- Kører på **serveren**
- Bruges til **data-fetching**, tunge sider og SEO-optimering
- Fordel: Al tung logik og databehandling sker på serveren, før siden sendes til browseren

## 2. Client Component
- Kører i **browseren**
- Bruges til **interaktivt UI**, fx knapper, animationer og forms
- Fordel: Reagerer hurtigt på brugerhandlinger

## 3. CSR (Client-Side Rendering)
- Siden rendres **helt i browseren**
- Bruges til **forms og UI-håndtering**
- Fordel: Interaktivitet uden server-opkald for hver handling

## 4. SSR (Server-Side Rendering)
- Siden rendres **på serveren ved hvert request**
- Bruges til **dynamisk data og SEO**
- Fordel: Ny data hentes hver gang, SEO optimeres

## 5. SSG (Static Site Generation)
- Sider genereres **ved build-time**
- Bruges til sider med **statisk data**, der ikke ændrer sig ofte
- Fordel: Super hurtig indlæsning, fordi siderne allerede er genereret

## 6. ISR (Incremental Static Regeneration)
- Kombinerer build-time og automatisk opdatering
- Sider genereres statisk, men kan **revalideres efter et interval**
- Bruges til sider, der skal opdateres løbende uden at rebuild hele siden


# Øvelse 1: Identificér renderingstypen
Lav en ny side: app/render-test/page.tsx
Indsæt: 
export default function Page() {
  return <h1>Render test</h1>;
}

## Hvilken renderingsstrategi bruges?
- Fordi siden ikke henter nogen data, bruger Next.js SSG (Static Site Generation) som standard.
- Siden genereres statisk ved build-time og kan leveres hurtigt til brugeren.

## Hvordan kan du bekræfte det?
- I terminalen

Kør npm run build og se outputtet i terminalen.
Next.js viser typisk, hvilke sider der bygges statisk (SSG) og hvilke der bruger SSR.

- I browser/devtools

Åbn siden /render-test
Højreklik → "View Page Source" (Vis Sidens Kilde)
HTML’en er allerede genereret på serveren (statisk), ikke efterfulgt af API-kald.
Der er ingen loading/fetching i network-tab ved første indlæsning.

- guide til dette: 

Åbn DevTools
Chrome / Edge: Højreklik → “Inspect”
Mac shortcut: Cmd + Option + I


Tjek Network-tab
Klik på fanen Network.
Reload siden (Cmd + R / Ctrl + R).
Se om der kommer fetch/POST/GET requests til dit API:
Hvis ingen ekstra requests til data vises, er siden statiske (SSG)
Hvis der hentes data på load, bruger siden SSR / CSR

Tip: Filtrér på “Doc” i Network-tab for kun at se HTML-dokumentet.

Tjek Page Source

Højreklik på siden → “View Page Source”
Hvis du ser det fulde HTML-indhold allerede i browseren, betyder det, at siden blev server-rendered eller statisk genereret
Hvis du kun ser et tomt <div id="__next"></div> uden indhold, er det CSR / client-side rendering, hvor indhold først genereres af JavaScript i browseren

Tjek React komponenter (valgfrit)

Installer React Developer Tools i browseren
Åbn DevTools → fanen Components
Her kan du se hvilke komponenter, der faktisk er mounted
Hvis siden allerede har HTML inden React-mount, blev den genereret på serveren (SSG eller SSR)
Hvis HTML er tom, og React fylder siden, er det CSR

Kort huskeregel

SSG / SSR: HTML er allerede i browseren → tjek “View Page Source”
CSR: HTML er tom ved første load → JS renderer siden i browseren
Incremental / revalidate: HTML er først statisk, men opdateres over tid → tjek “Network” for re-fetch

### Kort sagt: Siden rendres statiske HTML uden server-opkald, hvilket er karakteristisk for SSG.

## Øvelse 2: Lav en Server Component med data-fetching

Lav: app/time/page.tsx
Indsæt:
export default async function TimePage() {
  const res = await fetch("https://worldtimeapi.org/api/timezone/Europe/Copenhagen");
  const data = await res.json();

  return <h1>Tiden er: {data.datetime}</h1>;
}

## Hvilken renderingsstrategi bruger siden?

Renderingsstrategi: SSR (Server-Side Rendering)

- Hvorfor:

Siden henter data ved hvert request fra API’et
fetch bruges uden caching, så Next.js genererer HTML’en på serveren hver gang, inden den sendes til browseren
Dette adskiller sig fra SSG, hvor HTML genereres ved build-time, og fra ISR, hvor statiske sider regenereres med et interval

## Hvordan kan du bekræfte det?

- Terminalen / build:

npm run dev → Next.js viser ikke denne side som statisk genereret, fordi den fetcher data dynamisk

- Browser / DevTools:

Åbn siden http://localhost:3000/time
Tjek “View Page Source” → du ser HTML med den aktuelle tid
Genindlæs siden → værdien ændrer sig, fordi serveren render siden på ny hver gang
Ingen statisk build, derfor SSR

Server Components kan være async og hente data direkte på serveren
Perfekt til sider med dynamisk indhold, som skal være SEO-venligt
SSG og ISR passer bedre til statiske eller delvist statiske sider

# Øvelse 3: Lav en Client Component
Lav: app/counter/page.tsx
Indsæt:
'use client'

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

# Hvorfor skulle du bruge 'use client'?
- 'use client' fortæller Next.js, at denne komponent skal køre i browseren
Den gør det muligt at bruge hooks som useState, useEffect, og andre interaktive funktioner, som kun virker på klienten
Uden 'use client' ville Next.js forsøge at gøre komponenten til en Server Component, og interaktivitet med hooks ville fejle

# Hvorfor kan denne komponent ikke være en Server Component? 
- Server Components kan ikke bruge React hooks, fx useState eller useEffect
Server Components kan kun returnere JSX baseret på server-side data
Interaktivitet som at ændre tælleren (count) kræver, at komponenten kører i browseren
Derfor skal denne komponent deklareres som Client Component med 'use client' øverst

Server Component: Data + statisk indhold, ingen hooks, kører på serveren
Client Component: Interaktivt UI, bruger hooks, kører i browseren
Brug 'use client' altid i toppen af filen, når du vil have browser-interaktivitet