
'use client'

import { useState } from "react"
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Stack,
    Divider,
    InputAdornment
} from "@mui/material"

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"

import { useProfileContext } from "@/context/profileContext"

export default function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const { signUp, signIn, error } = useProfileContext()

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100",
                p: 2
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: { xs: 3, sm: 5 },
                    borderRadius: 4
                }}
            >
                <Stack spacing={3}>
                    {/* Header */}
                    <Box sx={{ textAlign: "center" }}>
                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                bgcolor: "primary.main",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mx: "auto",
                                mb: 2
                            }}
                        >
                            <LoginIcon fontSize="large" />
                        </Box>

                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Welcome Back
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            Log in or create an account to continue
                        </Typography>
                    </Box>

                    {/* Input Fields */}
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            placeholder="you@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlinedIcon color="action" />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon color="action" />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </Stack>

                    {error && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{
                                textAlign: "center",
                                bgcolor: "error.light",
                                color: "white",
                                p: 1.5,
                                borderRadius: 2,
                                fontWeight: 500
                            }}
                        >
                            {error}
                        </Typography>
                    )}

                    {/* Buttons */}
                    <Stack spacing={1.5}>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            startIcon={<LoginIcon />}
                            onClick={() => signIn(email, password)}
                            sx={{
                                py: 1.4,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600
                            }}
                        >
                            Log In
                        </Button>

                        <Divider>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                OR
                            </Typography>
                        </Divider>

                        <Button
                            fullWidth
                            size="large"
                            variant="outlined"
                            startIcon={<PersonAddAlt1Icon />}
                            onClick={() => signUp(email, password)}
                            sx={{
                                py: 1.4,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600
                            }}
                        >
                            Create Account
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )
}
