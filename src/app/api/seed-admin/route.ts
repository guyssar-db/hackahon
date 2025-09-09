// src/app/api/seed-admin/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST() {
    // (1) สร้าง user ถ้ายังไม่มี
    const created = await auth.api.createUser({
        body: {
            email: 'admin@example.com',
            password: 'secretpw',
            name: 'Admin',
        },
    });

    // (2) อัปเกรด role เป็น admin
    await auth.api.setRole({
        body: { userId: created.user.id, role: ['admin'] },
        headers: []
    });

    return NextResponse.json({ ok: true });
}
