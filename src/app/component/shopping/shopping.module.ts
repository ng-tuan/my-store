import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { UserInformationComponent } from './user-information/user-information.component';



@NgModule({
  declarations: [
    CartComponent,
    ConfirmationComponent,
    UserInformationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShoppingModule { }
