import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// TODO: connect Supabase — middleware disabled while DB is off
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
