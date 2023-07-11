import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data="Happy Banking With Us...!Welcome To Net Banking With SBI"
  pdata="Enter Account Number"

  login(){
    alert("Login Clicked")
  }
}
