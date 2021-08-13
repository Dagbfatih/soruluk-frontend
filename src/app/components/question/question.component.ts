import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/entities/question';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { QuestionService } from 'src/app/services/question.service';
import { alltranslates } from 'src/app/constants/TranslateManager';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  questions: QuestionDetailsDto[] = [];
  dataLoaded = false;
  
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getQuestionDetails().subscribe((response) => {
      this.questions = response.data;
      this.dataLoaded = true;
    });
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
