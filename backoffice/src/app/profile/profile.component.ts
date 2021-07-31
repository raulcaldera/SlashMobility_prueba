import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  profileForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    bio: new FormControl('')
  });

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

}
