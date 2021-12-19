import { Repository } from 'typeorm';
import { Post } from './entities/post';
import { Person } from './entities/person';

export type Context = {
    id: string;
    isProduction: boolean;
    req: Request;
    res: Response;
    postRepository: Repository<Post>;
    personRepository: Repository<Person>;
};
