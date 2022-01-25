import multer from 'multer';

console.log('hey hey');
export const upload = multer({
    limits: {
        fileSize: 10 * 1000 * 1000
    },

    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|svg|PNG|JFIF|jfif|SVG|JPEG)$/)) {
            throw new HttpError(404, 'File is not a valid');
        }

        cb(undefined, true);
    }
})