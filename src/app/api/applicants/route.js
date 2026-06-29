import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value === 'authenticated'
}

export async function GET() {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const applicants = await prisma.applicant.findMany({
      include: {
        job: true
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(applicants)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { jobId, jobTitle, name, email, phone, experience, coverLetter, resumeUrl } = body

    if (!name || !email || !phone || !experience || !jobTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const applicant = await prisma.applicant.create({
      data: {
        jobId: jobId || null,
        jobTitle,
        name,
        email,
        phone,
        experience,
        coverLetter: coverLetter || null,
        resumeUrl: resumeUrl || null,
        status: 'New'
      }
    })

    return NextResponse.json(applicant)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
