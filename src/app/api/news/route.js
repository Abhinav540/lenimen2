import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value === 'authenticated'
}

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        publishedAt: 'desc'
      }
    })
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, content, image } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newsItem = await prisma.news.create({
      data: {
        title,
        content,
        image: image || null,
        publishedAt: new Date()
      }
    })

    return NextResponse.json(newsItem)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
