import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPipe',
})
export class DataPipePipe implements PipeTransform {
  transform(
    transactionArray: any[],
    searchTerm: string,
    searchType: string
  ): any[] {
    //create an empty array to store output
    const result: any = [];

    //pipe logic
    if (!transactionArray || !searchTerm || !searchType) {
      return transactionArray;
    } else {
      transactionArray.forEach((item) => {
        if (item[searchType].includes(searchTerm)) {
          result.push(item);
        }
      });
    }

    //return output array
    return result;
  }
}
