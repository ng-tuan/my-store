import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/types/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  selectAmounts: string[] = ['1', '2', '3', '4', '5'];
  id!: number;
  product!: Product;
  amount: string = '1';
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cardService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.productService.getProduct().subscribe({
      next: (res) => {
        this.product = res.filter((item) => item.id === this.id)[0];
      },
      error: (err) => console.log(err),
    });
  }
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
      const msg = `${product.name} has been added to your cart.`;
      alert(msg);
    } else {
      productAdded.push(product);
      this.productService.addProduct(productAdded);
      const msg = `${product.name} has been added to your cart.`;
      alert(msg);
    }
  }
}
