import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignupForm=new FormGroup({uname:new FormControl(),
    email:new FormControl(),
    passwd:new FormControl()})
  constructor() {
    
   }

  ngOnInit() {
    
  }

}
