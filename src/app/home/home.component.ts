import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
 
  user:any=""
  acno:any=""
  profileData:any={}
  balanceData:any={}
  message:any=""
  status:any=true
  shareAcno:any=""

  moneyTransferForm=this.fb.group({
    toAcno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
   

  })
 

  constructor(private rout:Router, private ds :DataService,private fb:FormBuilder,private datePipe:DatePipe){}
  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("please login first")
      this.rout.navigateByUrl("")
    }
    if(localStorage.getItem("currentName")){
      this.user=localStorage.getItem("currentName")
      // console.log(this.user);

    }
  }

  logOut(){
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentName")
    this.rout.navigateByUrl("")
  }
 accountState(){
  this.rout.navigateByUrl('statement')
 }

  profileView(){
    if(localStorage.getItem("currentAcno")){  
    this.acno= localStorage.getItem("currentAcno")
    // console.log(this.acno);
    this.ds.getProfile(this.acno).subscribe((response:any)=>{
      this.profileData=response
    })

    }
  }

  balanceView(){
    if(localStorage.getItem("currentAcno")){
      this.acno=localStorage.getItem("currentAcno")
      // console.log(this.acno);
      this.ds.getBalance(this.acno).subscribe((response:any)=>{
        this.balanceData=response

      })
      
    }

  }

  transfer(){
    if(this.moneyTransferForm.valid){
      //from Acno
    if(localStorage.getItem("currentAcno")){
      this.acno=localStorage.getItem("currentAcno")
      // console.log(this.acno);
      
    }
    var path=this.moneyTransferForm.value
    //toAcno
    var toAcno=path.toAcno
    // console.log(toAcno);
    
    //psw
    var psw=path.psw
    // console.log(psw);
    
    //amount
    var amount=path.amount
    // console.log(amount);
    //date
    var dateTime=new Date()
    var dateData=this.datePipe.transform(dateTime,'short')
    // console.log(dateData);
    //api call
    this.ds.moneyTransferApi(this.acno,toAcno,psw,amount,dateData)
    .subscribe((result:any)=>{
      // console.log(result);
      this.message=result.Message
      this.status=true
    },
    result=>{
      // console.log(result.error.Message);
      this.message=result.error.Message
      this.status=false
      
    }
    )
      
  }
  else{
  this.message="invalid form"
  this.status=false
  }

    }
  
    //delete Account
    deleteAc(){
      //share data
      if(localStorage.getItem("currentAcno")){
        this.shareAcno=localStorage.getItem("currentAcno")
        // console.log(this.shareAcno); 
      }

    }
    cancel(){
      this.shareAcno=""
    }

    deleteAccount(event:any){
      this.ds.accountDeleteApi(event).subscribe((result:any)=>{
        // console.log(event);
        
        alert(`${event} deleted successfully`)
        this.logOut()
      })

    }

}

