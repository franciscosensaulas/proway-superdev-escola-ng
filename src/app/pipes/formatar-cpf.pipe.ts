import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarCpf'
})
export class FormatarCpfPipe implements PipeTransform {

  transform(cpf: string, ...args: unknown[]): unknown {
    if(cpf.length === 14)
      return cpf;
    // 92134567899
    // 921.345.678-99
    return cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + 
          "-" + cpf.substring(9, 11);
  }
}
// abrir terminal na pasta pipe
// ng g pipe formatar-cpf
// copiar código