






import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'


export async function GET(request: Request) { 

    await prisma.toDo.deleteMany()
    
    await prisma.toDo.createMany({
        data: [
            { description: 'Piedra de Alma', completed: true },
            { description: 'Piedra del Poder' },
            { description: 'Piedra del Tiempo' },
            { description: 'Piedra del Espacio' },
            { description: 'Piedra de Realidad' },
        ]
    })

    // const todo = await prisma.toDo.create({
    //     data: { 
    //         description: 'Piedra de Alma',
    //         completed: true,
    //     }
    // })

    // console.log('Todo created:', todo);

    return NextResponse.json({ message: 'Hello from the seed route!' });
}