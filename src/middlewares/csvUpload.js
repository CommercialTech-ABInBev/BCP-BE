const multer = require('multer');
const fs = require('fs');

var dir = 'src/upload';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const csvFilter = (req, file, cb) => {

  if (file.mimetype.includes('xlsx') || file.mimetype.includes('text/csv')) {
    cb(null, true);
  } else {
    cb('Please upload only csv file.', false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bcp-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: csvFilter });

module.exports = uploadFile;
