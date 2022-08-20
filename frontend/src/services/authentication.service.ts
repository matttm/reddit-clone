import exp from 'constants';

export function setToken(token: string): void {
    if (!token) {
        console.error(`Error: token is invalid`);
        return;
    }
    localStorage.setItem('TOKEN_KEY', token);
    console.info(`Token ${token} has been saved to localStorage`);
}

export function getToken(): string | null {
    return localStorage.getItem('TOKEN_KEEY');
}

export function isAuthenticated() {
    return localStorage.getItem('TOKEN_KEY');
}

export function setAuthInfo(id: string, username: string): void {
    localStorage.setItem('PERSON_ID', id);
    localStorage.setItem('USERNAME', username);
}
