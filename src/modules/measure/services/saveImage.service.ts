import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import { join } from 'path';

const uploadDir = join(process.cwd(), 'uploads');
@Injectable()
export class SaveImageService {
  createImage(image: any): [string, string] {
    const imageUUID = crypto.randomUUID();

    fs.writeFileSync(`${uploadDir}/${imageUUID}.png`, image, 'base64');
    return [imageUUID, `${uploadDir}/${imageUUID}.png`];
  }

  saveImage(image: any) {
    const rawImage = fs.readFile(image, (err, data) => {
      if (err) {
        console.log(err);
      }
      return data;
    });

    console.log(rawImage);
    // return this.createImage(rawImage);
  }
}
