import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/animations/fade-in-animation';
import { slideInAnimation } from 'src/app/animations/route-animations';
import { alltranslates } from 'src/app/constants/TranslateManager';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
