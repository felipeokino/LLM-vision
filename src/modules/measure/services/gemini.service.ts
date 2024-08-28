import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';

@Injectable()
export class GeminiService {
  private generativeAi: GoogleGenerativeAI;
  constructor() {
    this.generativeAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  fileToGenerativePart(path: string, mimeType: string) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString('base64'),
        mimeType,
      },
    };
  }

  async uploadImage(imagePath: string) {
    const image = this.fileToGenerativePart(imagePath, 'image/png');
    const prompt = `Extract the measure value from the image. 
    The value of the measure is a number that may or may not appear in currency format. 
    if after number appears bar code, ignore those numbers.
    if image is a measure tool, get only numbers inside visor and color black or red or white, numbers may be separated by a black pipe or inside a box.
    try to not confuse the pipe with the number 1.
    Measure prefixes or suffixes are not necessary to be included, but if they are, they must be cubic meters, kwatts, kwh, liters, gallons, cubic feet, kilograms, pounds, ounces, or mˆ3.
    If the measure value is not found, return 0. 
    Return the measure value as a number.
    Return only numbers.
    `;

    const model = this.generativeAi.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });
    const response = await model.generateContent([prompt, image]);

    return response.response.text();
  }
}
