import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { StorageEngine } from 'multer';

export type CustomMulterOptions = MulterOptions & { storage: StorageEngine };
