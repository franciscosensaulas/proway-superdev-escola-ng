import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataHoraCustomizada'
})
export class DataHoraCustomizadaPipe implements PipeTransform {

  constructor(private datePipe: DatePipe){}

  transform(data: Date, ...args: unknown[]): unknown {
    return this.datePipe.transform(data, "dd/MM/yyyy");
  }
}
