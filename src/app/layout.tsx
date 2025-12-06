import type { Metadata } from "next";
import "./globals.css";
import {ReactNode} from "react";
import AppShell from "@/app/components/layout/AppShell";

export const metadata: Metadata = {
    title: "Powerpuff TV Explorer",
    description: "Explore The Powerpuff Girls episodes using TVMaze API",
}

export default function RootLayout({
    children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-slate-950 text-slate-50">
                <AppShell>{children}</AppShell>
            </body>
        </html>
    )
}
