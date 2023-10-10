import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data="Happy Banking With Us...!Welcome To Net Banking With SBI"
  pdata="Enter Account Number"
  

  loginModelForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-z]+')]]
  })

  constructor(private rout:Router,private ds:DataService,private fb:FormBuilder){}
  ngOnInit(): void {
    
  }

  login(){

    if(this.loginModelForm.valid){
      var acno=this.loginModelForm.value.acno 
      var psw=this.loginModelForm.value.psw
     
      //API call
      this.ds.loginApi(acno,psw).subscribe((response:any)=>{
        //alert
        alert(`${response.uname} login successfully`)
        localStorage.setItem("currentName",response.uname)
        localStorage.setItem("currentAcno",response.acno)
        localStorage.setItem("token",JSON.stringify(response.token))
        // console.log(response.token);
        
         this.rout.navigateByUrl("home")
      },
      //alert error message
      response=>{
       alert(response.error)
      }
      )

    }
    else{
      alert("Invalid")
    }
   
    // this.acno=a.value
    // this.psw=b.value
    // console.log(this.acno);
    // console.log(this.psw); 
  }
 
}
