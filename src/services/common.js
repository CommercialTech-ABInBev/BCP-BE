const { BlobServiceClient } = require("@azure/storage-blob");
const azure = require("azure-storage");

import logger from '../logger';
import jwt from 'jsonwebtoken';
import env from '@src/config/env';
import sgMail from '@sendgrid/mail';
import { HttpError } from '@src/middlewares/api-error-validator';

const {
    JWT_SECRET_KEY,
    TOKEN_EXPIRES,
    SENDGRID_API_KEY,
    BUCKET_NAME,
    AZURE_KEY,
    STORAGE_CONNECTION_STRING
} = env;

export default class CommonService {
    static generateToken(sub) {
        return jwt.sign({ sub }, JWT_SECRET_KEY, {
            expiresIn: TOKEN_EXPIRES,
        });
    }

    static generateAuthToken(payload) {
        return jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn: TOKEN_EXPIRES,
        });
    }

    static decodeToken(token) {
        return jwt.verify(token, JWT_SECRET_KEY);
    }

    static async sendEmail(message) {
        sgMail.setApiKey(SENDGRID_API_KEY);
        await sgMail.send(message);
    }

    static generateReference(image) {
        const randomNumber = Math.floor(Math.random() * 8999 + 1000);
        const anotherRandomNumber = Math.floor(Math.random() * 8999 + 1000);
        const reference = `${image}${randomNumber}${anotherRandomNumber}`;
        return reference;
    }

    static async uploadImage(file) {
        try {

            const blobServiceClient = BlobServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);
            let i = 1;
            for await (const container of blobServiceClient.listContainers()) {
                logger.info(`Container ${i++}: ${container.name}`);
            };
            const blobService__ = azure.createBlobService(BUCKET_NAME, AZURE_KEY);
            let imageUrl;

            try {
                let blob = `${this.generateReference('IMG_')}.jpg`;

                let text = file.buffer;
                let type = file.mimetype;
                const data = blobService__.createBlockBlobFromText('procurement', blob, text, { contentType: type }, async(err, resultImage) => {
                    if (err) {
                        throw new HttpError(401, `The error could be found here ${err}`)
                    } else {
                        return await resultImage;
                    }
                });

                imageUrl = `https://eyemarket6973837452.blob.core.windows.net/procurement/${data.name}`

            } catch (error) {
                logger.info(error);
            }
            return imageUrl;
        } catch (error) {
            throw new HttpError(401, `The error could be found here ${error}`)
        }
    }

}