import prismadb from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()

    const { name, description, instructions, seed, categoryId, src } = body

    if (!user?.id || !user?.firstName) {
      return new NextResponse("You're not logged in.", { status: 401 })
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Missing fields.', { status: 400 })
    }

    const isUpgrade = await checkSubscription()

    if (!isUpgrade) {
      return new NextResponse('Please upgrade to create a companion.', {
        status: 403
      })
    }

    const companion = await prismadb.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        name,
        description,
        instructions,
        seed,
        src
      }
    })

    return NextResponse.json(companion)
  } catch (error) {
    return new NextResponse("We're sorry, something went wrong.", {
      status: 500
    })
  }
}
