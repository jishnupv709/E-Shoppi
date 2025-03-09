import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  id!: number;

  constructor(private route: ActivatedRoute, private commonService: CommonService, private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    // Get the id from the route parameters
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductDetails();
  }

  getProductDetails(): void {
    // Fetch product details using the id from the route
    this.commonService.getData(`products/${this.id}`).subscribe(
      (data: any) => {
        this.product = data;
      },
      error => {
        console.error('Error fetching product details:', error);
      }
    );
  }
  addToCart(product: any): void {
    // Construct the cart data object based on the product passed in.
    const cartData = {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image
    };
  
  // Retrieve existing cart data from localStorage
  const existingCart = localStorage.getItem('cart');
  let cart: any[] = [];

  if (existingCart) {
    try {
      cart = JSON.parse(existingCart);
    } catch (e) {
      console.error('Error parsing cart data from localStorage', e);
      cart = [];
    }
  }

  // Add the new item to the cart (or update if needed)
  cart.push(cartData);

  // Save the updated cart data back to localStorage as JSON
  localStorage.setItem('cart', JSON.stringify(cart));

  this.toastr.success('Product added to cart','Success');
  // Optionally, show a confirmation or update UI
  console.log('Product added to cart:', cartData);
    // this.commonService.postData('carts', cartData).subscribe(
    //   (response: any) => {
    //     console.log('Product added to cart:', response);
    //     // Optionally, display a success message to the user.
    //   },
    //   (error) => {
    //     console.error('Error adding product to cart:', error);
    //   }
    // );
    this.router.navigate(['/cart']);
  }
  
}
