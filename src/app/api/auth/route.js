import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { promises as fs } from 'fs'
import path from 'path'

async function getAdminPassword() {
  try {
    const configPath = path.join(process.cwd(), 'settings.json')
    const fileContent = await fs.readFile(configPath, 'utf8')
    const config = JSON.parse(fileContent)
    return config.adminPassword || 'admin123'
  } catch (e) {
    return process.env.ADMIN_PASSWORD || 'admin123'
  }
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (token === 'authenticated') {
    return NextResponse.json({ authenticated: true })
  }
  return NextResponse.json({ authenticated: false })
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { action, password, currentPassword, newPassword } = body

    const cookieStore = await cookies()
    const activePassword = await getAdminPassword()

    if (action === 'login') {
      if (password === activePassword) {
        cookieStore.set('admin_token', 'authenticated', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        })
        return NextResponse.json({ success: true })
      } else {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
      }
    }

    if (action === 'logout') {
      cookieStore.set('admin_token', '', { maxAge: 0, path: '/' })
      return NextResponse.json({ success: true })
    }

    if (action === 'change-password') {
      if (currentPassword !== activePassword) {
        return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 })
      }
      if (!newPassword || newPassword.length < 4) {
        return NextResponse.json({ error: 'New password must be at least 4 characters long' }, { status: 400 })
      }

      // Save new password
      const configPath = path.join(process.cwd(), 'settings.json')
      const config = { adminPassword: newPassword }
      await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8')

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
