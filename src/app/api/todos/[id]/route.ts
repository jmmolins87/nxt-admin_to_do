



import prisma from '@/lib/prisma';
import { ToDo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

interface Segments {
  params: {
    id: string;
  }
}

const getToDo = async (id: string): Promise<ToDo | null> => {

  const toDo = await prisma.toDo.findFirst({
    where: { id }
  })

  return toDo
}

export async function GET(request: Request, {params}: Segments) { 

  const toDo = await getToDo(params.id);

  if (!toDo) {
    return NextResponse.json({ message: `toDo con el id ${ params.id } no existe` }, { status: 404 });
  }

  return NextResponse.json(toDo, { status: 200 });
}

const putSchema = yup.object({
  completed: yup.boolean().optional(),
  description: yup.string().optional()
})

export async function PUT(request: Request, {params}: Segments) { 

  const toDo = await getToDo(params.id);

  if (!toDo) {
    return NextResponse.json({ message: `toDo con el id ${ params.id } no existe` }, { status: 404 });
  }

  try {
    const { completed, description, ...rest } = await putSchema.validate(await request.json())
  
    const updatedTodo = await prisma.toDo.update({
      where: { id: params.id },
      data: { ...rest }
    })
  
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al actualizar el toDo', error }, { status: 400 });
  }

}