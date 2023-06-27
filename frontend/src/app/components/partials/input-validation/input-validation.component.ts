import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl} from "@angular/forms";

const VALIDATORS_MESSAGES: any = {
  required: 'Required field',
  email: 'Invalid email address',
  minlength: 'Minimum length is 6 characters'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input() control!: AbstractControl;
  @Input() showErrorMessage: boolean = true;
  @Input() errorMessages: string[] = [];

  ngOnInit(): void {
    this.control.statusChanges.subscribe((status) => {
      this.checkValidation();
    });

    this.control.valueChanges.subscribe((value) => {
      this.checkValidation();
    })
  }

  checkValidation() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

}
