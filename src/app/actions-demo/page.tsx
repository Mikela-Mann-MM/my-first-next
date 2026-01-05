// app/actions-demo/page.tsx
'use client'  // Dette skal være her, fordi formen er interaktiv i browseren

import { saveMessage } from "./action";

export default function ActionsDemoPage() {
  return (
    <form action={saveMessage}>
      <input name="message" placeholder="Skriv en besked" />
      <button type="submit">Send</button>
    </form>
  );
}
/* Side med en form, der bruger en server action */