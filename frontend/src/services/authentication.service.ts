export function setToken(token: string): void {
    if (!token) {
        console.error(`Error: token is invalid`);
        return;
    }
    localStorage.setItem('TOKEN_KEY', token);
    console.info(`Token ${token} has been saved to localStorage`);
}
