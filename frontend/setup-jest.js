import {RouterMock} from "./tests/mocks/Router.mock";

const routerMock = { ...RouterMock };
jest.mock('next/router', () => ({
    default: {
        ...routerMock
    },
    useRouter: () => routerMock
}));
