export interface User {
    id: string;
    email: string;
    username?: string;
}

let _accessToken: string | null = null;
let _user: User | null = null;
const _listeners = new Set<() => void>();

const notify = () => _listeners.forEach((listener) => listener());

export const TokenManager = {
    getAccessToken: (): string | null => {
        return _accessToken;
    },
    setAccessToken: (token: string): void => {
        _accessToken = token;
        notify();
    },
    removeAccessToken: (): void => {
        _accessToken = null;
        notify();
    },
    getUser: (): User | null => {
        return _user;
    },
    setUser: (user: User | null): void => {
        _user = user;
        notify();
    },
    clearSession: (): void => {
        _accessToken = null;
        _user = null;
        notify();
    },
    subscribe: (listener: () => void): (() => void) => {
        _listeners.add(listener);
        return () => {
            _listeners.delete(listener);
        };
    },
    waitForToken: (timeoutMs = 10000): Promise<string> => {
        const token = _accessToken;
        if (token) return Promise.resolve(token);

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                unsubscribe();
                reject(new Error("Token wait timeout"));
            }, timeoutMs);

            const listener = () => {
                if (_accessToken) {
                    clearTimeout(timeout);
                    unsubscribe();
                    resolve(_accessToken);
                }
            };

            _listeners.add(listener);
            const unsubscribe = () => _listeners.delete(listener);
        });
    }
};
