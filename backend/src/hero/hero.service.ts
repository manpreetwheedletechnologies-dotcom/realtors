import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeroSettings, HeroSettingsDocument } from './hero.schema';

// Sensible defaults so the hero section still shows something the very
// first time the app runs, before an admin has saved anything from the
// dashboard.
const DEFAULT_HERO_IMAGES = [
  '/hero3.jpg',
  '/hero5.png',
  '/hero_8.jpeg',
  '/hero_9.jpeg',
  '/hero_10.jpeg',
];

@Injectable()
export class HeroService {
  constructor(
    @InjectModel(HeroSettings.name)
    private readonly heroModel: Model<HeroSettingsDocument>,
  ) {}

  private async getOrCreate(): Promise<HeroSettingsDocument> {
    let doc = await this.heroModel.findOne().exec();
    if (!doc) {
      doc = await this.heroModel.create({ images: DEFAULT_HERO_IMAGES });
    }
    return doc;
  }

  async getImages(): Promise<string[]> {
    const doc = await this.getOrCreate();
    return doc.images;
  }

  async setImages(images: string[]): Promise<string[]> {
    const doc = await this.getOrCreate();
    doc.images = images;
    await doc.save();
    return doc.images;
  }
}