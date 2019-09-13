import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export function requiredFileType( type: string ) {
  return (control: FormControl) => {
    const file = control.value;
    if ( file ) {
      const extension = file.name.split('.')[1].toLowerCase();
      if ( type.toLowerCase() !== extension.toLowerCase() ) {
        return {
          requiredFileType: true
        };
      }
      return null;
    }
    return null;
  };
}

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss']
})
export class SampleFormComponent implements OnInit {

  signup = new FormGroup({
    image: new FormControl(null, [Validators.required, requiredFileType('png')])
  });

  constructor() { }

  ngOnInit() {
  }

  submit() {
    console.log('submit');
  }

}
