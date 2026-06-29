import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value === 'authenticated'
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const activeOnly = searchParams.get('active') === 'true'

    const where = activeOnly ? { active: true } : {}

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(jobs)
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
    const { title, location, type, description, requirements, active } = body

    if (!title || !location || !type || !description || !requirements) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const job = await prisma.job.create({
      data: {
        title,
        location,
        type,
        description,
        requirements,
        active: active !== undefined ? !!active : true
      }
    })

    return NextResponse.json(job)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
