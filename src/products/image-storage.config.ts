import { diskStorage } from 'multer';

export const productStorage = diskStorage({
  destination: '../../uploads/products',
  filename: (req, file, callback) => {
    const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
    callback(null, filename);
  },
});
