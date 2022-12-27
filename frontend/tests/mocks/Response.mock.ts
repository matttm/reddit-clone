
export const MockResponse = function() {
    const self =  ({
        _status: 0,
        status: (s: number) => {
            self._status = s;
            return self;
        },
        json: () => self,
        setHeader: jest.fn()
    });
    return self;
}

