import { Repository } from 'typeorm';
import { Post } from './entities/post';
import { User } from './entities/user';

export type Context = {
    id: string;
    postRepository: Repository<Post>;
    userRepository: Repository<User>;
};
