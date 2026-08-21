export const formatDate = (zonedDate: Date, format?: string): string => {
    return zonedDate.toLocaleDateString();
}

export const isExpired = (date: Date): boolean => {
    const now = new Date();
    return date < now;
}

export const msUntilExpiry = (date: Date): number => {
    const now = new Date();
    return date.getTime() - now.getTime();
}