/** Converts a displayed price such as "$1,022.99" into a number (1022.99). */
export function parsePrice(text: string | null): number {
    const value = Number((text ?? '').replace(/[^0-9.]/g, ''));
    if (!text || Number.isNaN(value)) {
        throw new Error(`Could not parse price from "${text}"`);
    }
    return value;
}

/** Formats a number the way the store displays it, e.g. 22.99 -> "$22.99". */
export function formatPrice(value: number): string {
    return `$${value.toFixed(2)}`;
}
