import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { WebsiteIdea, WebsiteIdeaSchema } from './schemas/website-idea.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WebsiteIdea.name, schema: WebsiteIdeaSchema }
    ])
  ],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService],
})
export class SectionsModule {}
