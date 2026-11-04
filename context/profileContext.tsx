'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

import { createClient } from '@/lib/supabase/client'

import { useEffect } from 'react'
import { User } from '@supabase/supabase-js'

// create a type for your props
type ProfileContextProps = {
    value: string,
    setValue: (value: string) => void,
    signUp: (email: string, password: string) => void,
    signIn: (email: string, password: string) => void,
    user: User | null
}

// create a context variable
const ProfileContext = createContext<ProfileContextProps | undefined>(undefined)

// create a context provider
export function ProfileContextProvider(props: { children: ReactNode }) {
    const [value, setValue] = useState<string>("")

    const [user, setUser] = useState<User | null>(null)

    const supabase = createClient()

    useEffect(() => {
        if (!user) {
            supabase.auth.getUser().then((userResponse)=>{setUser(userResponse.data.user)})
        }
    }, [])


    function signUp(email: string, password: string) {
        supabase.auth.signUp({ email, password })
    }

    function signIn(email: string, password: string) {
        supabase.auth.signInWithPassword({ email, password })
    }

    return (
        <ProfileContext.Provider value={{ value, setValue, signUp, signIn, user }}>
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