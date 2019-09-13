import { Component, HostListener, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, FormControl, NG_VALIDATORS } from '@angular/forms';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'lib-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {

  // tslint:disable-next-line:ban-types
  onChange: Function;
  // tslint:disable-next-line:ban-types
  onTouch: Function;
  public file: File | null = null;
  public uploadStatus = null;
  public error = null;
  private acceptedFileTypes = ['image/png'];

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>, private uploadService: FileUploadService) { }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  // tslint:disable-next-line:ban-types
  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  // tslint:disable-next-line:ban-types
  registerOnTouched( fn: Function ) {
  }

  public validate(c: FormControl) {
    if (c.value) {
      if (this.acceptedFileTypes.includes(c.value.type)) {
        this.error = null;
        this.upload(c.value);
        return null;
      } else {
        this.error = 'Not accepted file type';
        this.uploadStatus = null;
        return { valid: false };
      }
    } else {
      return { valid: false };
    }
  }

  upload(file) {
    this.uploadService.uploadToRemote(file).subscribe((data) => {
      if (data.loaded) {
        this.uploadStatus = `${(data.loaded / data.total) * 100}%`;
      }
    }, (error) => {
      this.uploadStatus = 'api failed';
    });
  }

}
