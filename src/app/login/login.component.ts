import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data="Happy Banking With Us...!Welcome To Net Banking With SBI"
  pdata="Enter Account Number"
  acno:string=""
  psw:string=""

  login(a:any,b:any){
    // alert("Login Clicked")
   
    this.acno=a.value
    this.psw=b.value
    console.log(this.acno);
    console.log(this.psw); 
  }
  // acnoChange(event:any){
  //   console.log(event.target.value);
  // }
  // pswdChange(event:any){
  //   console.log(event.target.value);
    
  // }
}
