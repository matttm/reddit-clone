
export const MockResponse = {
    _status: 0,
    status: (s: number) => {
        // @ts-ignore
        this._status = s;
        return this;
    },
    json: () => this
}
