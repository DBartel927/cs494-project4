import { createClient } from "@/lib/supabase/client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

type AuthParams = {
    email: string
    password: string
    router: AppRouterInstance
    setError: (error: string | undefined) => void
}

export async function signIn({
    email,
    password,
    router,
    setError
}: AuthParams) {
    const supabase = createClient()

    setError(undefined)

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        setError(error.message)
        return
    }

    router.push("/")
}

export async function signUp({
    email,
    password,
    router,
    setError
}: AuthParams) {
    const supabase = createClient()

    setError(undefined)

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })

    if (error) {
        setError(error.message)
        return
    }

    if (data.session) {
        router.push("/")
    } else {
        setError("Check your email to confirm your account!")
    }
}


export async function signOut({
    router,
    setError
}: Omit<AuthParams, "email" | "password">) {
    const supabase = createClient()

    setError(undefined)

    const { error } = await supabase.auth.signOut()

    if (error) {
        setError(error.message)
        return
    }

    router.push("/login")
}