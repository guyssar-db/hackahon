// /profile/page.tsx
'use client';
import ProfilePageClient from '@/components/ProfilePageClient';
import LayoutMain from '@/layouts/LayoutMain';
import { Suspense } from 'react';

export default function Page() {
    return (
        <LayoutMain>
            <Suspense fallback={<div>Loading...</div>}>
                <ProfilePageClient />
            </Suspense>
        </LayoutMain>
    );
}
