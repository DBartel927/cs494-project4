
'use client'

import { useState, useEffect } from "react"
import imageCompression from "browser-image-compression"
import Image from "next/image"

import {
    Box,
    Button,
    Typography,
    Stack,
    IconButton,
    CircularProgress
} from "@mui/material"

import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { DeleteOutlineOutlined } from "@mui/icons-material"

import { useImageContext } from "@/context/imageContext"

export default function ImageUpload() {

    const { uploadImages, loading } = useImageContext()

    const [images, setImages] = useState<File[]>([])
    const [isCompressing, setIsCompressing] = useState(false)

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || [])
        const imageFiles = files.filter(file => file.type.startsWith("image/"))

        // Allow selecting the same file again
        e.target.value = ""

        if (!imageFiles.length) return

        setIsCompressing(true)

        try {
            const compressedImages = await Promise.all(
                imageFiles.map(async (file) => {
                    const compressed = await imageCompression(file, {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                        fileType: "image/webp"
                    })

                    const name = file.name.replace(/\.[^/.]+$/, "")

                    return new File(
                        [compressed],
                        `${name}.webp`,
                        {
                            type: "image/webp",
                            lastModified: Date.now()
                        }
                    )
                })
            )

            setImages(prev => [...prev, ...compressedImages])
        } catch (error) {
            console.error("Image compression failed:", error)
        } finally {
            setIsCompressing(false)
        }
    }

    function removeImage(index: number) {
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <Stack spacing={2}>
            <Button
                component="label"
                variant="outlined"
                disabled={isCompressing}
                startIcon={
                    isCompressing
                        ? <CircularProgress size={18} />
                        : <CloudUploadIcon />
                }
                sx={{
                    py: 2,
                    borderStyle: "dashed",
                    borderWidth: 2,
                    borderRadius: 2,
                    textTransform: "none"
                }}
            >
                {isCompressing ? "Compressing Images..." : "Select Images"}

                <input
                    hidden
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                />
            </Button>

            <Typography variant="body2" color="text.secondary">
                {images.length} image(s) selected
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                    gap: 2
                }}
            >
                {images.map((image, index) => (
                    <ImagePreview
                        key={`${image.name}-${image.lastModified}-${index}`}
                        image={image}
                        onRemove={() => removeImage(index)}
                    />
                ))}
            </Box>
            <Button
                fullWidth
                variant="contained"
                disabled={images.length === 0 || isCompressing || loading}
                onClick={async () => {
                    await uploadImages(images)
                    setImages([])
                }}
                sx={{ py: 1.5, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            >
                Upload {images.length > 0 ? `${images.length} Images` : "Images"}
            </Button>
        </Stack>
    )
}

function ImagePreview({
    image,
    onRemove
}: {
    image: File
    onRemove: () => void
}) {
    const [preview, setPreview] = useState("")

    useEffect(() => {
        const url = URL.createObjectURL(image)
        setPreview(url)

        return () => URL.revokeObjectURL(url)
    }, [image])

    return (
        <Box
            sx={{
                position: "relative",
                aspectRatio: "1",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "grey.200"
            }}
        >
            {preview && (
                <Image src={preview} alt={image.name} fill unoptimized style={{ objectFit: "cover" }} />
            )}

            <IconButton
                size="small"
                onClick={onRemove}
                sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    bgcolor: "white",
                    "&:hover": {
                        bgcolor: "grey.200"
                    }
                }}
            >
                <DeleteOutlineOutlined fontSize="small" />
            </IconButton>
        </Box>
    )
}
