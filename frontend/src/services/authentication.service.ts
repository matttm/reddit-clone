const isServer = typeof window === 'undefined';
import cookie from 'js-cookie';

export function setToken(token: any): void {
    if (isServer) return;
    if (typeof token === 'string') {
        // cookie
        // cookie.set('TOKEN_KEY', token);
        localStorage.setItem('TOKEN_KEY', token);
        console.info(`Token ${token} has been saved to localStorage`);
    } else {
        console.error('token cannot be set as it is not a string');
    }
}

export function getToken(): string | null {
    if (isServer) return '';
    return localStorage.getItem('TOKEN_KEY');
}

export function isAuthenticated() {
    if (isServer) return;
    return localStorage.getItem('TOKEN_KEY');
}

export function setAuthInfo(id: any, username: any): void {
    if (isServer) return;
    if (typeof id === 'string') {
        localStorage.setItem('PERSON_ID', id);
    }
    if (typeof username === 'string') {
        localStorage.setItem('USERNAME', username);
    }
}

export function destroyAuthInfo() {
    if (isServer) return;
    localStorage.removeItem('PERSON_ID');
    localStorage.removeItem('USERNAME');
    localStorage.removeItem('TOKEN_KEY');
    // cookie.remove('TOKEN_KEY');
}
