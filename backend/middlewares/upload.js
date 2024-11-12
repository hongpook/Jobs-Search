const multer = require('multer');
const path = require('path');

// Cấu hình lưu trữ
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Đảm bảo thư mục 'uploads/' đã tồn tại
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Đặt tên file dựa trên thời gian
    }
});

// Cấu hình upload cho 1 file
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }  // Giới hạn dung lượng file là 5MB
}).single('headshotImage');  // Đảm bảo chỉ có 1 file được tải lên với tên 'headshotImage'

module.exports = upload;
