import { Component, OnInit } from '@angular/core';
import { alltranslates } from 'src/app/constants/TranslateManager';

@Component({
  selector: 'app-user-operation-claim-add',
  templateUrl: './user-operation-claim-add.component.html',
  styleUrls: ['./user-operation-claim-add.component.css']
})
export class UserOperationClaimAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
