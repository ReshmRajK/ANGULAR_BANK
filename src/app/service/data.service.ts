import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


//overloading headers
const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  token:any=""


  constructor(private http:HttpClient) { }

  //method to add token in api header
  createHeader(){
    //httpHeaders
    const headers=new HttpHeaders()
    //access token from localStorage
    if(localStorage.getItem("token")){
      var token=JSON.parse(localStorage.getItem("token") || "")

      //add token into headers
      options.headers.append('access_token',token)
    }
    // return headers
    return options

  }
  
  //signup Api for register
  signupApi(acno:any,uname:any,psw:any){

    const bodyData={
      acno,
      uname,
      psw
    }
    return this.http.post('https://bank-server-yy2d.onrender.com/express/rout/register-user',bodyData)
  }

  //login Api for login

  loginApi(acno:any,psw:any){
    const bodyData={
      acno,
      psw
    }
    return this.http.post('https://bank-server-yy2d.onrender.com/express/rout/user-login',bodyData)
  }

  //get userProfile details Api
  getProfile(acno:any){

    return this.http.get('https://bank-server-yy2d.onrender.com/express/rout/user-profile/'+acno,this.createHeader())
  }

  //get balance details Api

  getBalance(acno:any){
    return this.http.get('https://bank-server-yy2d.onrender.com/express/rout/user-balance/'+acno,this.createHeader())
  }

  //money transfer Api
  //fromAcno.toAcno,psw,amount,date and time

  moneyTransferApi(fromAcno:any,toAcno:any,psw:any,amount:any,date:any){
    const bodyData={
      fromAcno,toAcno,psw,amount,date
    }
    return this.http.post('https://bank-server-yy2d.onrender.com/express/rout/money-transfer',bodyData,this.createHeader())
  }

  //transaction history Api
  transactionHistoryApi(acno:any){
    return this.http.get('https://bank-server-yy2d.onrender.com/express/rout/user-history/'+acno,this.createHeader())
  }

  //delete acno Api
  accountDeleteApi(acno:any){
    return this.http.delete('https://bank-server-yy2d.onrender.com/express/rout/user-delete/'+acno,this.createHeader())
  }
 
}
