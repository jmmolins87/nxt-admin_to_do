




import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import  * as yup from 'yup'


export async function GET(request: Request) { 

  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') ?? '10')
  const skip = Number(searchParams.get('skip') ?? '0')

  if(isNaN(take)) {
    return NextResponse.json({ message: 'Invalid take parameter' }, { status: 400 })
  }

  if(isNaN(skip)) {
    return NextResponse.json({ message: 'Invalid skip parameter' }, { status: 400 })
  }

  const toDos = await prisma.toDo.findMany({ take, skip })

  return NextResponse.json(toDos)
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false)
})

export async function POST(request: Request) { 

  try {
    const { complete, description } = await postSchema.validate(await request.json()) 
    const toDo = await prisma.toDo.create({ data: { completed: complete, description } })
  
    return NextResponse.json(toDo)

  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}