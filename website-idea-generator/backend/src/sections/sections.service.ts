import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebsiteIdea, WebsiteIdeaDocument } from './schemas/website-idea.schema';
import { CreateWebsiteIdeaDto, WebsiteIdeaResponseDto } from './dto/website-idea.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(WebsiteIdea.name)
    private websiteIdeaModel: Model<WebsiteIdeaDocument>,
  ) {}

  async generateSections(createWebsiteIdeaDto: CreateWebsiteIdeaDto): Promise<WebsiteIdeaResponseDto> {
    const { idea } = createWebsiteIdeaDto;

    // Generate 3 dummy sections based on the idea
    const sections = [
      {
        name: 'Hero Section',
        content: `Welcome to ${idea}! This is your compelling hero section that immediately captures your visitors' attention. Here you'll showcase your main value proposition and call-to-action that drives conversions.`,
        type: 'hero' as const
      },
      {
        name: 'About Section',
        content: `Learn more about ${idea}. This section provides detailed information about your business, mission, and what makes you unique. Share your story, values, and the passion behind your ${idea.toLowerCase()}.`,
        type: 'about' as const
      },
      {
        name: 'Contact Section',
        content: `Get in touch with ${idea}! We'd love to hear from you. Whether you have questions, need support, or want to learn more about our services, don't hesitate to reach out. Our team is here to help you succeed.`,
        type: 'contact' as const
      }
    ];

    // Save to MongoDB
    const websiteIdea = new this.websiteIdeaModel({
      idea,
      sections,
    });

    const savedWebsiteIdea = await websiteIdea.save();

    return {
      id: savedWebsiteIdea._id.toString(),
      idea: savedWebsiteIdea.idea,
      sections: savedWebsiteIdea.sections,
      createdAt: savedWebsiteIdea.createdAt.toISOString(),
    };
  }

  async getSectionById(id: string): Promise<WebsiteIdeaResponseDto> {
    const websiteIdea = await this.websiteIdeaModel.findById(id).exec();

    if (!websiteIdea) {
      throw new Error('Website idea not found');
    }

    return {
      id: websiteIdea._id.toString(),
      idea: websiteIdea.idea,
      sections: websiteIdea.sections,
      createdAt: websiteIdea.createdAt.toISOString(),
    };
  }

  async getAllSections(): Promise<WebsiteIdeaResponseDto[]> {
    const websiteIdeas = await this.websiteIdeaModel.find().exec();

    return websiteIdeas.map(idea => ({
      id: idea._id.toString(),
      idea: idea.idea,
      sections: idea.sections,
      createdAt: idea.createdAt.toISOString(),
    }));
  }
}
