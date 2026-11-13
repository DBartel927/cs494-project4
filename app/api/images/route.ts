import { put, list, del } from "@vercel/blob"

import { createClient } from "@/lib/supabase/server"
import { generateFileName } from "@/lib/file"

export async function POST(request: Request) {

    const supabase = await createClient()
    const user = await supabase.auth.getUser()

    if (!user || !user.data.user) {
        return Response.json(
            { error: "User not authenticated" },
            { status: 401 }
        )
    }

    const id = user.data.user.id
    const formData = await request.formData()
    const images = formData.getAll("images") as File[]
    const urls: string[] = []

    for (let i = 0; i < images.length; i++) {

        const { url } = await put(
            `${id}/${generateFileName()}`,
            images[i],
            {
                access: "public"
            }
        )
        urls.push(url)
    }

    return Response.json({
        imageUrls: urls
    })
}

export async function GET() {

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user || !user.data.user) {
        return Response.json(
            { error: "User not authenticated" },
            { status: 401 }
        )
    }

    const id = user.data.user.id
    const blobs = (
        await list({
            prefix: `${id}/`
        })
    ).blobs

    const imageUrls = blobs.map(blob => blob.url)

    return Response.json({
        imageUrls
    })
}

export async function DELETE(request: Request) {

    const supabase = await createClient()
    const user = await supabase.auth.getUser()

    if (!user || !user.data.user) {
        return Response.json(
            { error: "User not authenticated" },
            { status: 401 }
        )
    }

    const id = user.data.user.id
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get("url")

    if (!imageUrl) {
        return Response.json(
            { error: "Image URL is required" },
            { status: 400 }
        )
    }

    const blobs = (
        await list({
            prefix: `${id}/`
        })
    ).blobs

    const imageExists = blobs.some(
        blob => blob.url === imageUrl
    )

    if (!imageExists) {
        return Response.json(
            { error: "Image not found" },
            { status: 404 }
        )
    }

    await del(imageUrl)

    return Response.json({
        success: true
    })
}