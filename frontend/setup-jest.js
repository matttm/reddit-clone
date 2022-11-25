import {RouterMock} from "./tests/mocks/Router.mock";

const routerMock = { ...RouterMock };
jest.mock('next/router', () => ({
    Router: {
        ...routerMock
    },
    useRouter: () => routerMock
}));
