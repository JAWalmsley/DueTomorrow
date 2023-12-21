'use client';

import { useRouter } from 'next/navigation';
export default function RedirectIndex({ params }) {
    const router = useRouter();
    router.push('/assignments');
}