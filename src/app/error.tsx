'use client';

import { useEffect } from 'react';
import Button from '@atlaskit/button/new';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
            <div className="max-w-xl space-y-2">
                <h1 className="text-3xl font-bold">Something went wrong</h1>
                <p className="text-slate-300">
                    We could not load the episodes right now. Please try again or refresh the page.
                </p>
            </div>
            <Button appearance="primary" onClick={reset}>
                Try again
            </Button>
        </div>
    );
}