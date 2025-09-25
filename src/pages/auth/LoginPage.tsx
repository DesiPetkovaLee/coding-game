import LoginForm from "../../components/auth/LoginForm";
import { Container } from "@mui/material";

export default function LoginPage() {
    return (
        <Container component="main" maxWidth="xs">
            <LoginForm />
        </Container>
    );
}
