import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  ngOnInit(): void {
    this.loadCart();
  }

  // Retrieve cart data from localStorage
  loadCart(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        this.cart = JSON.parse(storedCart);
      } catch (error) {
        console.error('Error parsing cart data:', error);
        this.cart = [];
      }
    } else {
      this.cart = [];
    }
  }

  // Remove a single item from the cart
  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log('Item removed from cart. Updated cart:', this.cart);
  }

  // Clear the entire cart
  clearCart(): void {
    localStorage.removeItem('cart');
    this.cart = [];
    console.log('Cart cleared!');
  }
}
