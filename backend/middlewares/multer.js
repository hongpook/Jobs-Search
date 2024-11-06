const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'avt', maxCount: 1 }, 
    { name: 'cvFile', maxCount: 1 }, 
    { name: 'imageUrl', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
]);

module.exports = upload;
