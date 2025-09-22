import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Grid, Link as MuiLink, Alert, Stack } from "@mui/material";
import { useAuth } from "../../appState/auth/useAuth";
import { signupUser } from "../../api/users.ts";

export default function SignupForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!/^[a-zA-Z0-9]+$/.test(name)) {
            newErrors.name = "Username must only contain letters and numbers";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (password.length < 5 || password.length > 12) {
            newErrors.password = "Password must be between 5 and 12 characters";
        } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
            newErrors.password = "Password must contain at least one letter and one number";
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        const { user, error: apiError } = await signupUser({ name, email });

        if (user) {
            login(user);
            navigate("/story");
        } else {
            setErrors({ form: apiError || "An unknown error occurred." });
        }
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h4">
                Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                {errors.form && <Alert severity="error">{errors.form}</Alert>}
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="User Name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                </Stack>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
                <Grid container justifyContent="flex-end">
                    <MuiLink component={Link} to="/login" variant="body2">
                        Already have an account? Sign In
                    </MuiLink>
                </Grid>
            </Box>
        </Box>
    );
}
