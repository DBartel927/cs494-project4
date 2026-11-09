'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

import { createClient } from '@/lib/supabase/client'

import { useEffect } from 'react'
import { User } from '@supabase/supabase-js'

import { useRouter } from 'next/navigation'

import { signIn as authSignIn, signUp as authSignUp, signOut as authSignOut } from "@/lib/auth"

// create a type for your props
type ProfileContextProps = {
    signUp: (email: string, password: string) => void,
    signIn: (email: string, password: string) => void,
    signOut: () => void,
    user: User | null,
    error: string | undefined
}

// create a context variable
const ProfileContext = createContext<ProfileContextProps | undefined>(undefined)

// create a context provider
export function ProfileContextProvider(props: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const [error, setError] = useState<string | undefined>(undefined)

    const supabase = createClient()

    const router = useRouter()

    useEffect(() => {
        if (!user) {
            supabase.auth.getUser().then((userResponse) => { setUser(userResponse.data.user) })
        }
    }, [])
// Test
    function signIn(email: string, password: string) {
        return authSignIn({
            email,
            password,
            router,
            setError
        })
    }

    function signUp(email: string, password: string) {
        return authSignUp({
            email,
            password,
            router,
            setError
        })
    }

    function signOut() {
        return authSignOut({
            router,
            setError
        })
    }

    return (
        <ProfileContext.Provider value={{ signUp, signIn, signOut, user, error }}>
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