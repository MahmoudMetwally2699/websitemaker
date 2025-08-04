export interface Section {
  name: string;
  content: string;
  type: 'hero' | 'about' | 'contact';
}

export interface WebsiteIdea {
  id: string;
  idea: string;
  sections: Section[];
  createdAt: Date;
}

export interface GenerateRequest {
  idea: string;
}

export interface GenerateResponse {
  id: string;
  idea: string;
  sections: Section[];
  createdAt: string;
}

export interface ApiError {
  message: string;
  status: number;
}
