import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private commonService: CommonService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.commonService.getData('products').subscribe(
      (data: any[]) => {
        this.products = data;
      },
      error => console.error('Error fetching products:', error)
    );
  }
 
  navigateToProductDetails(productId: number): void {
    // Navigate to /product-details/:id
    console.log("routing ",productId)
    this.router.navigate(['/product-details', productId]);
  }
}
