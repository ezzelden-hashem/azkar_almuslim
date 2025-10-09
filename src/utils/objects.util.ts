export function deepEqual(a: any, b: any): boolean
{
    if (a === b) return true;

    if (Array.isArray(a) && Array.isArray(b))
    {
        if (a.length !== b.length) return false;
        return a.every((v, i) => deepEqual(v, b[i]));
    }

    if (typeof a === "object" && typeof b === "object" && a && b)
    {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        return keysA.every(k => deepEqual(a[k], b[k]));
    }

    return false;
}
