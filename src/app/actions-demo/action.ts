// app/actions-demo/actions.ts
"use server"

export async function saveMessage(formData: FormData) {
  const msg = formData.get("message");
  console.log("Besked modtaget:", msg);
}
/* Server action til at gemme en besked */