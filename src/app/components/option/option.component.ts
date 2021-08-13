import { Component, OnInit } from '@angular/core';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Option } from 'src/app/models/entities/option';
import { OptionService } from 'src/app/services/option.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  options:Option[]=[];
  dataLoaded=false;
  constructor(private optionService:OptionService) { }

  ngOnInit(): void {
    this.getOptions();
  }

  getOptions(){
    this.optionService.getOptions().subscribe(response=>{
      this.options=response.data;
      this.dataLoaded=true;
    });
  }
  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
