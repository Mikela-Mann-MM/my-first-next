"use client"

import { saveMessage } from "../lib/actions";
import { useActionState, useEffect, useState } from "react";
import { z } from "zod";

export default function FormPage(){

  const initialState = {
    data: {
      name: "",
      message: ""
    },
    success: false
  };

   const [formState, formAction, isPending] = useActionState(saveMessage, initialState); //useActionState tager server action og initial state. Det er et hook fra React
  
useEffect(function () {
    console.log("Formular sendt og behandlet:", formState);
}, [formState]);

//noValidate forhindrer browserens egen validering html5, så vi kan håndtere det selv. 
    return (
    <form action={formAction} noValidate> 
      <label >Navn:
        <input className={`bg-white text-black ${formState.error?.properties?.name && "border-red-500"}`} name="name" type="text" placeholder="Skriv dit navn" defaultValue={formState.data.name}/>
      {formState.success ? null : <p>{ formState.error?.properties?.name?.errors }</p> }
      </label>
      <label >Besked:
        <input name="message" type="text" placeholder="Skriv en besked" defaultValue={formState.data.message}/>
       {formState.success ? null : <p>{ formState.error?.properties?.message?.errors }</p> } 
      </label>  
      
      <button type="submit" disabled={isPending}>{isPending ? "Sender..." : "Send"}</button>
      {formState.success ? <p>Tak for din tilmelding</p> : null }
    </form>
  );

}

/* <p>{ formState.error?.properties?.message.errors }</p> optional chaining?. ?. betyder:
👉 “Hvis dette findes, så fortsæt — ellers stop og returnér undefined.” */
/* Side med en form, der bruger en server action */

/* Det hele er gemt i en serveraction, fordelen ved det er, 
at vi gemmer koden væk fra brugeren, så de ikke kan se, hvad der sker omme bagved. 
Det handler om sikkerhed. */

/* Når FormAction svarer tilbage får vi et opdateret formState med det vi returnerer. isPending er en boolean - true/false */
