// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Image / file metafield structure
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Difficulty type literal (matches content model)
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

// Question type literal
export type QuestionType = 'Multiple Choice' | 'True/False' | 'Short Answer';

// Test Subject
export interface TestSubject extends CosmicObject {
  type: 'test-subjects';
  metadata: {
    name?: string;
    description?: string;
    icon?: string;
    color?: string;
    display_order?: number;
  };
}

// Practice Test
export interface PracticeTest extends CosmicObject {
  type: 'practice-tests';
  metadata: {
    title?: string;
    subject?: TestSubject;
    difficulty?: string;
    time_limit?: number;
    instructions?: string;
    free_trial?: boolean;
    cover_image?: CosmicImage;
  };
}

// Question option structure
export interface QuestionOption {
  value: string;
  label?: string;
}

// Question
export interface Question extends CosmicObject {
  type: 'questions';
  metadata: {
    question_text?: string;
    practice_test?: PracticeTest;
    question_type?: string;
    options?: string[] | QuestionOption[];
    correct_answer?: string;
    explanation?: string;
    points?: number;
  };
}

// API response
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isPracticeTest(obj: CosmicObject): obj is PracticeTest {
  return obj.type === 'practice-tests';
}

export function isTestSubject(obj: CosmicObject): obj is TestSubject {
  return obj.type === 'test-subjects';
}

export function isQuestion(obj: CosmicObject): obj is Question {
  return obj.type === 'questions';
}