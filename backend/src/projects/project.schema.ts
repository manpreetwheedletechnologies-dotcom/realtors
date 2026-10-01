import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

export const PROJECT_STATUSES = ['Upcoming', 'Ongoing', 'Completed', 'Sold Out'];

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, trim: true })
  title: string;

  // URL-friendly id, auto-generated from title (unique)
  @Prop({ unique: true, index: true })
  slug: string;

  @Prop({ default: '' })
  tagline: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 'Upcoming', enum: PROJECT_STATUSES })
  status: string;

  @Prop({ default: '' })
  location: string;

  @Prop({ default: '' })
  type: string; // Residential / Commercial / Farm Land ...

  @Prop({ default: '' })
  price: string; // free text e.g. "₹25 Lakh onwards"

  @Prop({ default: '' })
  area: string; // e.g. "50 acres" / "200 - 500 sq.yds"

  @Prop({ default: '' })
  totalUnits: string;

  @Prop({ default: '' })
  developer: string;

  @Prop({ default: '' })
  reraNumber: string;

  @Prop({ default: '' })
  launchDate: string;

  @Prop({ default: '' })
  possessionDate: string;

  @Prop({ default: '' })
  coverImage: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  // Legacy single video (kept so old projects keep working). New projects use `videos`.
  @Prop({ default: '' })
  videoUrl: string;

  // Uploaded video files ("/uploads/xxx.mp4") and/or YouTube links - shown in the project gallery
  @Prop({ type: [String], default: [] })
  videos: string[];

  @Prop({ default: '' })
  brochureUrl: string;

  @Prop({ type: [String], default: [] })
  highlights: string[];

  @Prop({ type: [String], default: [] })
  amenities: string[];

  // Show on landing page
  @Prop({ default: true })
  showOnLanding: boolean;

  // Draft (false) vs Live (true)
  @Prop({ default: true })
  isPublished: boolean;

  // Lower number = shown first
  @Prop({ default: 0 })
  order: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
