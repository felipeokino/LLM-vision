import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import { join } from 'path';

const uploadDir = join(process.cwd(), 'uploads');
@Injectable()
export class SaveImageService {
  createImage(image: any): string {
    const imageUUID = crypto.randomUUID();

    fs.writeFileSync(`${uploadDir}/${imageUUID}.png`, image, 'base64');
    return imageUUID;
  }
}
