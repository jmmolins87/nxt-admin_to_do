






import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'


export async function GET(request: Request) { 

    await prisma.toDo.deleteMany()
    
    await prisma.toDo.createMany({
        data: [
            { id: '1', description: 'Piedra de Alma', completed: true, updatedAt: new Date() },
            { id: '2', description: 'Piedra del Poder', completed: false, updatedAt: new Date() },
            { id: '3', description: 'Piedra del Tiempo', completed: false, updatedAt: new Date() },
            { id: '4', description: 'Piedra del Espacio', completed: false, updatedAt: new Date() },
            { id: '5', description: 'Piedra de Realidad', completed: false, updatedAt: new Date() },
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