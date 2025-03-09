import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  products: any[] = [];
  category:any;

  constructor(private commonService: CommonService, private router: Router,private route: ActivatedRoute,) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      this.getProductsCategory();
    });
  }

  getProductsCategory(): void {
    console.log("Category",this.category)
    this.commonService.getData(`products/category/${this.category}`).subscribe(
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
