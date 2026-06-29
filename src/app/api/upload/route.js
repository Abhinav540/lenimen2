import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value === 'authenticated'
}

export async function POST(req) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Create a safe, unique filename
    const originalName = file.name || 'image.png'
    const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${Date.now()}-${safeName}`
    
    const publicAssetsPath = path.join(process.cwd(), 'public', 'assets')
    const filePath = path.join(publicAssetsPath, fileName)

    await fs.writeFile(filePath, buffer)

    return NextResponse.json({ success: true, filename: fileName })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
