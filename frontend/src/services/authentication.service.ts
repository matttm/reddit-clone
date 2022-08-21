import exp from 'constants';

export function setToken(token: any): void {
    if (typeof token === 'string') {
        localStorage.setItem('TOKEN_KEY', token);
        console.info(`Token ${token} has been saved to localStorage`);
    } else {
        console.error('token cannot be set as it is not a string');
    }
}

export function getToken(): string | null {
    return localStorage.getItem('TOKEN_KEEY');
}

export function isAuthenticated() {
    return localStorage.getItem('TOKEN_KEY');
}

export function setAuthInfo(id: any, username: any): void {
    if (typeof id === 'string') {
        localStorage.setItem('PERSON_ID', id);
    }
    if (typeof username === 'string') {
        localStorage.setItem('USERNAME', username);
    }
}
