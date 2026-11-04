'use client'

import { Box, Button, TextField } from "@mui/material"

import { useState } from "react"

export default function Login(){
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    return (
        <Box>
            <TextField 
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
                placeholder="password" 
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <Button variant="contained">Log In</Button>
            <Button variant="contained">Sign Up</Button>
        </Box>
    )
}