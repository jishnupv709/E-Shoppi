import { Component } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mobileMenuOpen = false;
  womenFlyoutOpen = false;
  menFlyoutOpen = false;
  profileMenuOpen = false;

  constructor(private commonService: CommonService) {}
  
  ngOnInit(): void {
    this.getCategories()
  }
  categories:any=[];
  getCategories(){
    this.commonService.getData('products/categories').subscribe(
      (data: string[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  navigateToCategory(category: string) {

  }
  // Toggle mobile menu (should be visible only on small screens)
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  // Toggle desktop flyout menus
  toggleWomenFlyout(): void {
    this.womenFlyoutOpen = !this.womenFlyoutOpen;
    if (this.menFlyoutOpen) {
      this.menFlyoutOpen = false;
    }
  }

  toggleMenFlyout(): void {
    this.menFlyoutOpen = !this.menFlyoutOpen;
    if (this.womenFlyoutOpen) {
      this.womenFlyoutOpen = false;
    }
  }

  // Example popup handler (replace with your modal logic)
  openPopup(): void {
    alert('Popup opened!');
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }
}
