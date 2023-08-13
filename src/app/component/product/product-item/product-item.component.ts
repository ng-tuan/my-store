import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/types/products';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  selectAmounts: string[] = ['1', '2', '3', '4', '5'];
  amount: string = '1';
  constructor(
    private productService: ProductService,
    private cardService: CartService
  ) {}

  ngOnInit(): void {}

  updateAmout(value: any) {
    this.amount = value;
  }

  addToCart(product: Product) {
    const productAdded: Product[] = this.cardService.getCartProduct();
    const indexExistProduct = productAdded.findIndex(
      (prod) => prod.id === product.id
    );
    product.amount = this.amount;
    if (indexExistProduct > -1) {
      productAdded[indexExistProduct].amount = this.amount;
      this.productService.addProduct(productAdded);
    } else {
      productAdded.push(product);
      this.productService.addProduct(productAdded);
      const msg = `${product.name} has been added to your cart.`;
      alert(msg);
    }
  }
}
