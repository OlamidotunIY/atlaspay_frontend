export const truncate = (str: string, maxLength: number): string => {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + '...';
}

export const slugify = (str: string): string => {
    return str
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

export const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split('@');
    const maskedLocalPart = localPart.length > 2 ? localPart[0] + '***' + localPart.slice(-1) : localPart;
    return `${maskedLocalPart}@${domain}`;
}

export const maskAccountNumber = (accountNumber: string): string => {
    if (accountNumber.length <= 4) {
        return accountNumber;
    }
    return accountNumber.slice(0, -4) + '****';
}