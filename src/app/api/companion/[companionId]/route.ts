import prismadb from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params: { companionId } }: { params: { companionId: string } }
) {
  try {
    const body = await req.json()
    const user = await currentUser()

    const { name, description, instructions, seed, categoryId, src } = body

    if (!companionId) {
      return new NextResponse('Missing companionId.', { status: 400 })
    }

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

    const companion = await prismadb.companion.update({
      where: { id: companionId, userId: user.id },
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

export async function DELETE(
  req: Request,
  { params: { companionId } }: { params: { companionId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("You're not logged in.", { status: 401 })
    }

    if (!companionId) {
      return new NextResponse('Missing companionId.', { status: 400 })
    }

    const companion = await prismadb.companion.delete({
      where: {
        userId,
        id: companionId
      }
    })

    return NextResponse.json(companion)
  } catch (error) {
    return new NextResponse("We're sorry, something went wrong.", {
      status: 500
    })
  }
}
