'use client'

import { createContext, useContext, useState, ReactNode } from 'react'


// create a type for your props
type ImageContextProps = {
    uploadImages: (images: File[]) => void

}

// create a context variable
const ImageContext = createContext<ImageContextProps | undefined>(undefined)

// create a context provider
export function Imagecontext(props: { children: ReactNode }) {
    
    function uploadImages(images: File[]){
        console.log(images)
    }


    return (
        <ImageContext.Provider value={{ uploadImages }}>
            {props.children}
        </ImageContext.Provider>
    )
}

// create a function to use the context
export function useImageContext() {
    const context = useContext(ImageContext)
    if (!context) {
        throw new Error('useProfileContext must be used within a ProfileContextProvider')
    }
    return context
}