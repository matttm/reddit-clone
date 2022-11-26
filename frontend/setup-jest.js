import {RouterMock} from "./tests/mocks/Router.mock";

const routerMock = { ...RouterMock };
jest.mock('next/router', () => ({
    __esModule: true,
    default: routerMock,
    useRouter: () => routerMock
}));
