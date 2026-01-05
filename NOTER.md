#Netx.js Reflektionsnoter

## 1. Hvilken port kører dit projekt på? 
- Port	localhost:3000
- Hvis port 3000 er optaget, vælger Next automatisk næste ledige
## 2. Hvad sker der, når du ændrer en fil? 
- Fil ændres	Auto reload
Next.js har hot reload / Fast Refresh:
Når du gemmer en fil:
Browseren opdateres automatisk
State bevares (så vidt muligt)
Ingen manuel refresh
Ingen genstart af serveren

Det gælder både:
page.tsx
components
styles (CSS / Tailwind)

Hvis du ændrer konfigurationsfiler (next.config.js, .env), skal du dog genstarte serveren.

## 3. Hvordan stopper du serveren?
- Stop server	Ctrl + C

## 4. Public-mappen (`my-first-next/public`)
my-first-next/public
Her lægger du statiske filer, fx billeder, ikoner, PDF’er, osv.
Filer her bliver tilgængelige direkte via URL uden nogen ekstra routing.

public/favicon.ico
http://localhost:3000/favicon.ico


## 5. package.json – scriptet `dev`
I package.json
Find scriptet "dev" - hvad gør dette script? 
Starter Next.js i udviklingsmode
Serveren kører på http://localhost:3000
Har Hot Reload / Fast Refresh
Bruges til udvikling, ikke produktion 

## 6. Hvilke filer skulle du installere eller konfigurere for routing i Next?
Installation/opsætning:
Next.js (npx create-next-app@latest) gør det meste automatisk
Du skal kun konfigurere layout.tsx, page.tsx og specielle filer (loading, not-found)
Ingen ekstra router-biblioteker som i React


## 7. Forskelle fra React + React Router
Routing i Next.js adskiller sig fra React med React Router på flere måder. Først og fremmest er routing i Next.js fil-baseret, hvor hver fil i app/-mappen automatisk bliver en side, f.eks. app/page.tsx for forsiden. I React med React Router er routing kode-baseret, hvor du selv skriver <Route path="/about" element={<About/>}/> for hver side.

Next.js har indbygget server-side support med Server Components og automatisk SSR/SSG, mens React Router som udgangspunkt kun kører client-side, medmindre du selv sætter server-side rendering op.

Dynamiske routes håndteres i Next.js med filnavne som [slug]/page.tsx, mens React Router bruger kode som <Route path="/:slug" ...> for at definere variable paths.

Layouts i Next.js defineres med layout.tsx, som deler HTML-struktur, body og styles på tværs af underliggende sider. I React Router skal du selv lave en layout-komponent og wrappe dine routes for at opnå samme effekt.

Endelig håndterer Next.js 404-sider og loading-states med not-found.tsx og loading.tsx, mens du i React Router selv skal styre dette via conditional rendering eller fallback-komponenter.


/app/layout.tsx	= Fælles struktur/layout for hele appen 
/app/page.tsx	= En side i din app
/public	= Filer du kan tilgå direkte fra browseren
/app/about/page.tsx	= Route til /about

## 8. Fordele ved filbaseret routing
Du skal ikke installere router-software
Overskuelig projektstruktur
Hurtigere at arbejde med
Automatisk generering af ruter
Layouts giver bedre organisering

## 9. Dashboad Settings:
/dashboard → viser DashboardPage inden for layoutet

/dashboard/settings → viser DashboardSettingsPage inden for layoutet

## 10 Noter – Layout vs Side

Layoutet leverer:

nav (Dashboard Menu)

Wrapper <div> / <section>

Siden leverer:

Indholdet i {children}, fx <h1>Velkommen til Dashboard</h1> eller <h1>Dashboard Settings</h1>

Kort sagt: layout = ramme / struktur, side = specifikt indhold

