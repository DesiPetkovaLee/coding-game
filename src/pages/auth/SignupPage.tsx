import { useEffect, useState } from "react";
// import SignupForm from "../../components/auth/SignupForm";
import { Container } from "@mui/material";
import { getAllData } from "../../api/backendClients";

const githubLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
};
const apiEndPoint = "/api/user/user-info";
const apiMessage = "user";

export default function SignupPage() {
    const [user, setUser] = useState();

    useEffect(() => {
        fetchUser();
    });

    const fetchUser = async () => {
        const data = await getAllData(apiEndPoint, apiMessage);
        setUser(data);
        console.log("user:", user)
    };

    return (
        <Container component="main" maxWidth="xs">
            {/* <SignupForm /> */}
            <button onClick={githubLogin}>Login with Github</button>

        </Container>
    );
}
