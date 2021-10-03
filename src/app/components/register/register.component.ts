import { Component, OnInit } from '@angular/core';
import { alltranslates } from 'src/app/constants/TranslateManager';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
