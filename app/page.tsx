import Profile from "@/components/profile"

import ImageUpload from "@/components/imageUpload"
import { Box } from "@mui/material"

export default function Home() {
    return (
        <main>
            <Profile />
            <Box sx={{ p: 2 }}>
                <ImageUpload />
            </Box>
        </main>
    )
}
