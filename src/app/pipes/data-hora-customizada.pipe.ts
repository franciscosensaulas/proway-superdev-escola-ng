import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataHoraCustomizada'
})
export class DataHoraCustomizadaPipe implements PipeTransform {

  transform(data: unknown, ...args: unknown[]): unknown {
    return data;
  }
}
