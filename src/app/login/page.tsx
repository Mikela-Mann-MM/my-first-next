import LoginForm from "../components/forms/login-form";


export default function LoginPage() {
    return (
        <>
            <h1>Log ind</h1>
            <LoginForm />
        </>
    );
}


//react måde at tænke på - vores views / pages indeholder så lidt eller ingen HTML logik som muligt. 
// HTML og logik er gemt i componenter, så vores pages er kasse der indeholde alt det den skal indeholde - logikken ligger andre steder.
