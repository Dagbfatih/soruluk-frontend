import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { alltranslates } from 'src/app/constants/TranslateManager';

@Component({
  selector: 'app-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css'],
})
export class AppFooterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  checkIfExam(): boolean {
    return this.router.url.includes('exam');
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
