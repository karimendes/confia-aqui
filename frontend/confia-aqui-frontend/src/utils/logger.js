export function debug(...args) {
    if (import.meta.env.DEV) {
        const sanitized = args.map(a => sanitizeForLogging(a));
        console.debug(...sanitized);
    }
}

export function info(...args) {
    console.info(...args);
}

export function warn(...args) {
    const sanitized = args.map(a => sanitizeForLogging(a));
    console.warn(...sanitized);
}

export function error(...args) {
    const sanitized = args.map(a => sanitizeForLogging(a));
    console.error(...sanitized);
}

export function sanitizeForLogging(value) {
    const sensitiveKeys = new Set(['rightAnswer', 'token', 'password', 'authorization', 'Authorization']);
    function sanitize(v, depth = 0) {
        if (v === null || v === undefined) return v;
        if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return v;
        if (Array.isArray(v)) return v.map(x => sanitize(x, depth+1));
        if (typeof v === 'object') {
            if (depth > 5) return '[Object]';
            const out = {};
            for (const k of Object.keys(v)) {
                if (sensitiveKeys.has(k)) {
                    out[k] = '[REDACTED]';
                } else {
                    try {
                        out[k] = sanitize(v[k], depth+1);
                    } catch(e) {
                        out[k] = '[Unserializable]';
                    }
                }
            }
            return out;
        }
        return String(v);
    }
    try {
        return sanitize(value);
    } catch (e) {
        return '[SanitizationError]';
    }
}
