'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ImageContextProps = {
    imageUrls: string[]
    uploadImages: (images: File[]) => Promise<void>
    getImages: () => Promise<void>
    deleteImage: (imageUrl: string) => Promise<void>
    loading: boolean
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined)

export function ImageContextProvider(props: { children: ReactNode }) {
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    async function getImages() {
        setLoading(true)

        const response = await fetch("/api/images")
        const data = await response.json()

        if (response.ok) {
            setImageUrls(data.imageUrls)
        }

        setLoading(false)
    }

    async function uploadImages(images: File[]) {
        setLoading(true)

        const formData = new FormData()

        images.forEach(image => formData.append("images", image))

        const response = await fetch("/api/images", {
            method: "POST",
            body: formData
        })

        const data = await response.json()

        if (response.ok) {
            setImageUrls(prev => [...prev, ...data.imageUrls])
        }

        setLoading(false)
    }

    async function deleteImage(imageUrl: string) {
        setLoading(true)

        const response = await fetch(`/api/images?url=${encodeURIComponent(imageUrl)}`, {
            method: "DELETE"
        })

        if (response.ok) {
            setImageUrls(prev => prev.filter(url => url !== imageUrl))
        }

        setLoading(false)
    }

    return (
        <ImageContext.Provider value={{ imageUrls, uploadImages, getImages, deleteImage, loading }}>
            {props.children}
        </ImageContext.Provider>
    )
}

export function useImageContext() {
    const context = useContext(ImageContext)

    if (!context) {
        throw new Error('useImageContext must be used within an ImageContextProvider')
    }

    return context
}