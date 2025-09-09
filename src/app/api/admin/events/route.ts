// src/app/api/events/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
    const ok = await auth.api.userHasPermission({
        body: {
            permissions: { event: ['create'] },
        },
    });
    if (!ok) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

    return NextResponse.json({ ok: true });
}
