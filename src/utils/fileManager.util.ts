import { extname } from 'path';

export class FileUtils {
  static generateFilename(req, file, cb) {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${randomName}${extname(file.originalname)}`);
  }

  static getStorageOptions(destination: string) {
    return {
      destination,
      filename: FileUtils.generateFilename,
    };
  }
}
