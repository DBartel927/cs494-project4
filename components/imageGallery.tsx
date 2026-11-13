'use client'

import { useEffect } from "react"
import Image from "next/image"
import { Box, CircularProgress, IconButton, Typography } from "@mui/material"
import { DeleteOutlineOutlined } from "@mui/icons-material"
import { useImageContext } from "@/context/imageContext"

export default function ImageGallery() {
    const { imageUrls, getImages, deleteImage, loading } = useImageContext()

    useEffect(() => {
        getImages()
    }, [])

    if (loading && imageUrls.length === 0) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                My Gallery
            </Typography>

            {imageUrls.length === 0 ? (
                <Typography color="text.secondary">
                    No images uploaded yet.
                </Typography>
            ) : (
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2 }}>
                    {imageUrls.map(imageUrl => (
                        <Box key={imageUrl} sx={{ position: "relative", aspectRatio: "1", borderRadius: 2, overflow: "hidden", bgcolor: "grey.200" }}>
                            <Image src={imageUrl} alt="Gallery image" fill sizes="(max-width: 600px) 50vw, 25vw" style={{ objectFit: "cover" }} />

                            <IconButton size="small" onClick={() => deleteImage(imageUrl)} sx={{ position: "absolute", top: 5, right: 5, bgcolor: "white", "&:hover": { bgcolor: "grey.200" } }}>
                                <DeleteOutlineOutlined fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}