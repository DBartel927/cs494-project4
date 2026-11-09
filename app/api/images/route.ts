import { put, list } from "@vercel/blob"

import { createClient } from "@/lib/supabase/server"

import { generateFileName } from "@/lib/file"

export async function POST(request: Request) {

    const supabase = await createClient()
    const user = await supabase.auth.getUser()

    if (!user || !user.data.user) {
        return Response.json({ error: "User not authenticated" })
    }

    const id = user.data.user.id

    const formData = await request.formData()

    const images = formData.getAll("images")

    console.log(images[0])

    const urls = []

    for (let i = 0; i < images.length; i++) {

        const { url } = await put(`${id}/${generateFileName()}`, images[0], { access: 'public' })
        urls.push(url)
    }

    return Response.json({ "imageUrls": urls })
}

export async function GET() {
    const supabase = await createClient()
    const user = await supabase.auth.getUser()

    if (!user || !user.data.user) {
        return Response.json({ error: "User not authenticated" })
    }

    const id = user.data.user.id

    console.log(id)

    const blobs = (await list({prefix: id})).blobs

    const imageUrls = blobs.map(blob=>blob.url)

    return Response.json({imageUrls})

}

export async function DELETE(request: Request) {
    // should be able to delete a file by path
}