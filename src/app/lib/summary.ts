export function cleanSummary(summary: string | null): string[] {
    if (!summary) return [];

    const withoutTags = summary
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

    return withoutTags
        .split(/\s*\n+\s*|\s{2,}/)
        .map((text) => text.trim())
        .filter(Boolean);
}