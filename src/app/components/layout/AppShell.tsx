'use client'

import {ReactNode} from "react";
import Heading from "@atlaskit/heading";

export default function AppShell({ children }: { children: ReactNode }) {

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
                    <div
                        aria-hidden
                        className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-xs font-bold"
                    >
                        PPG
                    </div>
                    <Heading size="large">Powerpuff TV Explorer</Heading>
                </div>
            </header>

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
                {children}
            </main>

            <footer className="border-t border-slate-800 text-xs text-slate-400 py-3 px-4 text-center">
                by TVMaze API
            </footer>
        </div>
    )
}