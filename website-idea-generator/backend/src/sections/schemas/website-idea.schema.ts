import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebsiteIdeaDocument = WebsiteIdea & Document & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema()
export class Section {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, enum: ['hero', 'about', 'contact'] })
  type: 'hero' | 'about' | 'contact';
}

@Schema({ timestamps: true })
export class WebsiteIdea {
  @Prop({ required: true })
  idea: string;

  @Prop({ type: [Section], required: true })
  sections: Section[];
}

export const WebsiteIdeaSchema = SchemaFactory.createForClass(WebsiteIdea);
