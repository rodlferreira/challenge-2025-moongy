'use client';

import Link from 'next/link';
import Button from '@atlaskit/button/new';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold">Episode not found</h1>
            <p className="text-slate-300">The episode you are looking for does not exist or has been removed.</p>
            <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-lg">
                <Button appearance="primary">Back to list</Button>
            </Link>
        </div>
    );
}