import { redirect } from 'next/navigation';

export default function RedirectIndex({ params }) {
    redirect('/assignments');
}