import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWebsiteIdeaDto {
  @IsString()
  @IsNotEmpty()
  idea: string;
}

export class SectionDto {
  name: string;
  content: string;
  type: 'hero' | 'about' | 'contact';
}

export class WebsiteIdeaResponseDto {
  id: string;
  idea: string;
  sections: SectionDto[];
  createdAt: string;
}
