'use client'

import {ReactNode} from "react";
import Heading from "@atlaskit/heading";

export default function AppShell({ children }: { children: ReactNode }) {

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
            <a
                href="#content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-3 focus:py-2 focus:bg-pink-600 focus:text-white focus:rounded-lg"
            >
                Skip to main content
            </a>
            <header className="border-b border-slate-800 bg-slate-950/60 backdrop-blur">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
                    <div
                        aria-hidden
                        className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold shadow-lg"
                    >
                        PPG
                    </div>
                    <div className="flex flex-col">
                        <Heading size="xxlarge">Powerpuff TV Explorer</Heading>
                        <span className="text-xs text-slate-300">Discover, search and favorite every episode</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
                {children}
            </main>

            <footer className="border-t border-slate-800 text-xs text-slate-400 py-4 px-4 text-center">
                Data by TVMaze
            </footer>
        </div>
    )
}