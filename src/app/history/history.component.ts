import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

import jspdf from 'jspdf';
import 'jspdf-autotable'


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  acno:any=""
  transactions:any=[]
  date:any
  searchKey:any=""

  constructor(private rout:Router,private ds:DataService){}
  ngOnInit(): void {

    //date-create object for it..
    this.date=new Date()
    // console.log(this.date);
    
    if(localStorage.getItem("currentAcno")){
      this.acno=localStorage.getItem("currentAcno")
    }
    this.ds.transactionHistoryApi(this.acno).subscribe((result:any)=>{
      this.transactions=result
      // console.log(result);
      

    })
  }

  backToHome(): void{
    this.rout.navigateByUrl('home')
  }

 searchKeyChange(key:any){
  this.searchKey=key
 }

 covertPdf(){

  //create an object for jsPDF
  var pdf=new jspdf()

  //set columns title
  let col=["Type","Amount","Account Holder Name","Date"]
  //row set
  let row:any=[]
  //set style
  pdf.setFontSize(16)
  //heading set
  pdf.text('Account Statement',15,10)
  //set color
  pdf.setTextColor(99)
  //font size reset
  pdf.setFontSize(12)
  //array of object convert to array of array(nested array)
  var allItems=this.transactions
  for(let i of allItems){
    let rowData=[i.type,i.amount,i.user,i.date]
    row.push(rowData)
  }
  //nested array convert to pdf
  (pdf as any).autoTable(col,row,{startY:15})
  //open pdf into new window
  pdf.output('dataurlnewwindow')
  //save pdf
  pdf.save('miniStatement.pdf')

 }

}
