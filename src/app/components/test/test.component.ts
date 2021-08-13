import { Component, OnInit } from '@angular/core';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Test } from 'src/app/models/entities/test';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  tests:Test[]=[];
  dataLoaded=false;
  constructor(private testService:TestService) { }

  ngOnInit(): void {
    this.getTests();
  }

  getTests(){
    this.testService.getTests().subscribe(response=>{
      this.tests=response.data;
      this.dataLoaded=true;
    });
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
