import { Repository } from 'typeorm';
import { Post } from './entities/post';
import { User } from './entities/user';

export type Context = {
    id: string;
    isProduction: boolean;
    req: Request;
    res: Response;
    postRepository: Repository<Post>;
    userRepository: Repository<User>;
};
