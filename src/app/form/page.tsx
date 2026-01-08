

import { saveMessage } from "../lib/actions";

export default function FormPage() {
  
    return (
    <form action={saveMessage}>
      <input name="message" placeholder="Skriv en besked" />
      <button type="submit">Send</button>
    </form>
  );

}
/* Side med en form, der bruger en server action */
