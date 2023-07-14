import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  sData="data inside service file"

  constructor() { }
  accessData(data:any){
    console.log(data);
    
  }
}
