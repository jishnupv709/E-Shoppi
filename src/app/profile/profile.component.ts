import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
interface Geolocation {
  lat: string;
  long: string;
}

interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

interface Name {
  firstname: string;
  lastname: string;
}

interface Profile {
  address: Address;
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  phone: string;
  __v: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile!: Profile;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getUser().subscribe(
      (data: Profile) => {
        this.profile = data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
