// src/lib/permissions.ts
import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access';

// 1) บอกว่าเรามี resource อะไร และ action อะไรได้บ้าง
export const statement = {
    ...defaultStatements, // ค่ามาตรฐาน (user, session permissions)
    event: ['create', 'update', 'delete', 'list'],
    role: ['set', 'list'],
} as const;

// 2) สร้าง access controller
export const ac = createAccessControl(statement);

// 3) สร้าง roles ของเรา
export const user = ac.newRole({
    event: ['list'],
});

export const organize = ac.newRole({
    event: ['create', 'update', 'list'],
    role: ['list'],
});

export const admin = ac.newRole({
    ...adminAc.statements, // สิทธิ์แอดมินมาตรฐาน (จัดการ user/session)
    event: ['create', 'update', 'delete', 'list'],
    role: ['set', 'list'],
});
