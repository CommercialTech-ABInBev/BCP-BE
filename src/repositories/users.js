import User from '@src/models/user';
import BaseRepository from '@src/repositories/index';

export default class TokenRepository extends BaseRepository {
    constructor() {
        super(User);
    }
}