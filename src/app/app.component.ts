import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'escola-ng';

  constructor(private router: Router) { }

  redirecionarCursos() {
    // carregando/navegando para a rota /cursos
    this.router.navigate(["/cursos"])
  }

  redirecionarHome(){
    this.router.navigate(["/"])
  }
}
