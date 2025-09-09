// auth.cli.mjs  (ใช้กับ CLI เท่านั้น)
import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import { admin } from 'better-auth/plugins/admin'; // ต้องใส่ถ้าคุณใช้งานปลั๊กอินนี้จริง

const db = new Database('./auth.db'); // ใช้ไฟล์จริง, ไม่ใช่ ":memory:"

export const auth = betterAuth({
    emailAndPassword: { enabled: true },
    database: db,
    user: {
        additionalFields: {
            role: { type: 'string', input: false }, // ไม่ต้องตั้ง defaultValue ตรงนี้
        },
    },
    plugins: [admin()], // ถ้าโปรเจกต์จริงใช้ admin plugin ให้ใส่ไว้ ตรงกับของจริง
});

export default auth; // <<< สำคัญมาก
