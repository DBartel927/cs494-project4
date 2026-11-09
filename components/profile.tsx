
'use client'

import { useProfileContext } from "@/context/profileContext"

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box
} from "@mui/material"

import LogoutIcon from "@mui/icons-material/Logout"

export default function Profile() {
    const { user, signOut } = useProfileContext()

    return (
        <Box>
            <AppBar position="static" elevation={1}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Project 4
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography variant="body2">
                            {user?.email}
                        </Typography>

                        <Button
                            color="inherit"
                            startIcon={<LogoutIcon />}
                            onClick={signOut}
                        >
                            Sign Out
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
