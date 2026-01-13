import { NextResponse } from "next/server";


export async function proxy(request) {
    //console.log("Denne log kommmer fra proxy.js");
    //console.log("request", request.nextUrl);
  if (!request.cookies.has("access_token")) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
if (request.cookies.get("access_token").value !== "1234" ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
// disse if sætninger hedder Guard clauses 
// er korte, tidlige checks, der afbryder funktionen med det samme, 
// hvis en forudsætning ikke er opfyldt. - små korte tjeks. 
// De sørger for at brugeren har adgang til siden
// hvis ikke så bliver brugeren sendt til login siden 

}

export const config = {
  matcher: ['/pokemon/:path*'] // Match all routes starting with /pokemon flere endpoints [/pokemon/:path*', '/api/pokemon/:path*']
};  