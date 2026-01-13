
"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginAction(prevState: any, formData: FormData) {
    const values = Object.fromEntries(formData);

if (values.username === "admin" 
    && values.password === "jensen"
) {
    const cookieStore = await cookies();
    cookieStore.set("access_token", "1234", { maxAge: 30 * 60}); //hvis den ikke har en age så er det en session cookie
    return redirect('/pokemon');
} 
    return {
        success: false,
        data: values,
        error: "Ugyldigt brugernavn eller adgangskode",
    };
}

    //hvad er en cookie? Det er en textstreng - den har et navn og en værdi - den har sikkerheds funktionaliteter. 
    //cookies bruges til at gemme informationer om brugeren - session management, personalisering, tracking osv.
    //cookies gemmes i browseren og sendes med hver request til serveren.
    //cookies kan have en udløbsdato - session cookies slettes når browseren lukkes, persistent cookies gemmes i en bestemt tid.
    //må det her sitet kigge på cookien eller ej

    // hvad kan vi bruge cookies til? 
    // vi kan bruge cookies til at gemme en session token - så brugeren forbliver logget ind når de navigerer rundt på sitet.
    // vi kan bruge cookies til at gemme bruger præferencer - f.eks sprog, tema osv.
    // vi kan bruge cookies til at tracke bruger adfærd - f.eks analytics, marketing ANNONCER osv.

    //google - vil du acceptere cookies? - ja/nej - hvis ja så gemmer de en cookie i din browser.
    // cookies kan også bruges til ondsindede formål - f.eks tracking, cross-site scripting, session hijacking osv.
    // 
    // blackhat hackers kan også bruge cookies til at stjæle informationer - f.eks session hijacking, cross-site scripting osv.
    // derfor er det vigtigt at sikre sine cookies - HttpOnly, Secure, SameSite osv.

    