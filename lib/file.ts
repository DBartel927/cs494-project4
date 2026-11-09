export function generateFileName(extension: string = "webp"): string {
    return `${crypto.randomUUID()}.${extension}`
}