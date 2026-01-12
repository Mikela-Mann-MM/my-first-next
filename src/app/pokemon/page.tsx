import Image from 'next/image';

export default async function PokemonPage() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const data = await response.json();

    return (
        <ul>
            {data.results.map((item, index) => {
                const array = item.url.split("/");
                const id = array[array.length -2]; 
                
                return (
                <li key={index}>
                    <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
                    alt={item.name} 
                    width={475} //original size 475x475 tilgængelighed og performance.
                    height={475} 
                    />
                    {item.name}
                    </li>
                );
            })}
        </ul>       
    );
}

// for billeder skal de 4 attributter være tilstede: src, alt, width, height

// next/image optimerer billederne automatisk for performance og tilgængelighed

//tjek evt lighthouse rapporten for at se forbedringer i performance score

// next/image understøtter også lazy loading som standard

// billeder kan hentes fra eksterne kilder ved at tilføje domænet i next.config.js filen pga sikkerhed.