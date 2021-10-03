export interface Test {
  id: number;
  userId: number;
  title: string;
  description: string;
  testTime: number;
  privacy: boolean;
  lessonId: number;
  date: Date;
  difficultyLevel: number;
}
