import Token from '@src/models/token';
import BaseRepository from '@src/repositories/index';

export default class TokenRepository extends BaseRepository {
    constructor() {
        super(Token);
    }
}