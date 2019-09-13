import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    HttpClientModule
  ],
  exports: [FileUploadComponent]
})
export class FileUploadModule { }
