import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestAddService } from 'src/app/services/test-add.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
  ],
  providers: [
    TestAddService,
  ],
})
export class IocModule {}
