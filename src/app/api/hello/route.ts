

import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

  return NextResponse.json({
    Hola: "Mundo"
  })
}

export async function POST(request: Request) {

    return NextResponse.json({
        Hola: "Mundo",
        Method: "POST"
    })
  }