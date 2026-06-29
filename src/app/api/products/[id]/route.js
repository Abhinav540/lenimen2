import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value === 'authenticated'
}

export async function PUT(req, { params }) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { brand, composition, section, group, strength, form, image, accent, featured, description } = body

    if (!brand || !section || !group || !accent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        brand,
        composition: composition || '',
        section,
        group,
        strength: strength || 'As directed',
        form: form || 'Tablet',
        image: image || null,
        accent,
        featured: !!featured,
        description: description || null
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    if (!await checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
