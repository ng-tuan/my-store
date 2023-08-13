import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  name!: string | null;
  totalPrice!: number | string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((routeParams) => {
      this.name = routeParams['name'];
      this.totalPrice = Number(routeParams['totalPrice']).toFixed(2);
    });
  }

  backToHome(): void {
    window.location.href = '/';
  }
}
