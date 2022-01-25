import CommonService from './common';
import env from '../config/env';
import DbService from '../repositories';
import AuthUtils from '../utils/auth';
import { HttpError } from '@src/middlewares/api-error-validator';
import db from '../models';

const { Tokens, Users, Stocks } = db;

const { addEntity, findByKeys, updateByKey, deleteByKey } = DbService;


export default class stockService {
    async createStock(body, file) {
        const imageUrl = await CommonService.uploadImage(file);
        console.log(imageUrl, 'ingurl');
        const data = {
            ...body,
            supportDocFile: imageUrl
        }

        const stockItem = await addEntity(Stocks, data);
        return stockItem;
    }
}