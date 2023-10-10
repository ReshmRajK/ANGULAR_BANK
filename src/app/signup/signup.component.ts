import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  pswMatch:boolean=false
  signupModelForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
    cpsw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
  })
  constructor(private rout:Router,private fb:FormBuilder,private ds:DataService){}

  ngOnInit(): void {
    
  }
   signUp(){
    var path=this.signupModelForm.value
    var acno=path.acno
    var uname=path.uname
    var psw=path.psw
    var cpsw=path.cpsw
    if(this.signupModelForm.valid){
      if(psw==cpsw){
        this.pswMatch=false
        //API calll
        this.ds.signupApi(acno,uname,psw).subscribe((response:any)=>{
          // alert
          alert(`${response.uname} registered successfully....`)
          this.rout.navigateByUrl("")
          
        },
        response=>{
          alert(response.error)
        }
        )
  
      }else{
        this.pswMatch=true
      }
      
    }
    else{
      alert("Invalid")
    }
      
    }
  }


