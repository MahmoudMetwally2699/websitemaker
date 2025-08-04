import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpException,
  ValidationPipe
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateWebsiteIdeaDto, WebsiteIdeaResponseDto } from './dto/website-idea.dto';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post('generate')
  async generateSections(
    @Body(new ValidationPipe()) createWebsiteIdeaDto: CreateWebsiteIdeaDto,
  ): Promise<WebsiteIdeaResponseDto> {
    try {
      return await this.sectionsService.generateSections(createWebsiteIdeaDto);
    } catch (error) {
      throw new HttpException(
        'Failed to generate sections',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getSectionById(@Param('id') id: string): Promise<WebsiteIdeaResponseDto> {
    try {
      return await this.sectionsService.getSectionById(id);
    } catch (error) {
      if (error.message === 'Website idea not found') {
        throw new HttpException(
          'Website idea not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Failed to fetch sections',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllSections(): Promise<WebsiteIdeaResponseDto[]> {
    try {
      return await this.sectionsService.getAllSections();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all sections',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
