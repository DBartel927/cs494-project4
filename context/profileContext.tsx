'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

import { createClient } from '@/lib/supabase/client'

// create a type for your props
type ProfileContextProps = {
    value: string,
    setValue: (value: string) => void,
    signUp: (email: string, password: string) => void
}

// create a context variable
const ProfileContext = createContext<ProfileContextProps | undefined>(undefined)

// create a context provider
export function ProfileContextProvider(props: { children: ReactNode }) {
    const [value, setValue] = useState<string>("")

    const supabase = createClient()

    function signUp(email: string, password: string){
        supabase.auth.signUp({email, password})
    }

    return (
        <ProfileContext.Provider value={{ value, setValue, signUp }}>
            {props.children}
        </ProfileContext.Provider>
    )
}

// create a function to use the context
export function useProfileContext() {
    const context = useContext(ProfileContext)
    if (!context) {
        throw new Error('useProfileContext must be used within a ProfileContextProvider')
    }
    return context
}