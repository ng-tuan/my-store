import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css'],
})
export class UserInformationComponent implements OnInit {
  createInformation!: FormGroup;
  @Output() informationUser = new EventEmitter();
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.createInformation = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      creditCard: ['', [Validators.required]],
    });
  }
  onSubmitCheckout() {
    this.informationUser.emit(this.createInformation.value);
  }
  get fullName() {
    return this.createInformation.get('fullName');
  }
  get address() {
    return this.createInformation.get('address');
  }
  get creditCard() {
    return this.createInformation.get('creditCard');
  }
}
