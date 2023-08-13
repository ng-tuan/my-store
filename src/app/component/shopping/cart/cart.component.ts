import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { Product } from 'src/app/types/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private route: Router) {}
  totalPrice: number | string = 0;
  cart: Product[] = [];
  @Output() user = new EventEmitter();
  ngOnInit(): void {
    this.cart = this.cartService.getCartProduct();
    this.calculateTotalPrice();
  }

  selectedChangeAmount(value: any, product: Product) {
    const index = this.cart.indexOf(product);
    if (value.target.value > 0) {
      this.cart[index] = product;
      this.cart[index].amount = value.target.value;
    } else {
      this.cart = this.cart.filter((card) => card.id !== product.id);
      const msg = `${product.name} has been removed to your cart.`;
      alert(msg);
    }
    localStorage.setItem('products', JSON.stringify(this.cart));
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((acc, curr) => {
      return parseFloat((acc + curr.price * Number(curr.amount)).toFixed(2));
    }, 0);
  }

  onSubmitCheckout(value: any) {
    this.cartService.clearCart();
    this.route.navigate(['/confirmation'], {
      queryParams: { name: value.fullName, totalPrice: this.totalPrice },
    });
  }
}
