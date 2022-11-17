
export const RouterMock = {
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn((e) => {
        console.log('pushing mock', e)
    }),
    events: {
        on: jest.fn(),
        off: jest.fn()
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null)
};
