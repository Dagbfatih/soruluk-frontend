import { Component, OnInit } from '@angular/core';
import { alltranslates } from 'src/app/constants/TranslateManager';

@Component({
  selector: 'app-user-operation-claim-delete',
  templateUrl: './user-operation-claim-delete.component.html',
  styleUrls: ['./user-operation-claim-delete.component.css']
})
export class UserOperationClaimDeleteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
