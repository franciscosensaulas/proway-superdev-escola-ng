import { Routes } from '@angular/router';
import { CursosListaComponent } from './components/cursos/cursos-lista/cursos-lista.component';
import { CursoCadastroComponent } from './components/cursos/curso-cadastro/curso-cadastro.component';
import { AlunosListaComponent } from './components/alunos/alunos-lista/alunos-lista.component';
import { CursoEditarComponent } from './components/cursos/curso-editar/curso-editar.component';

export const routes: Routes = [
    {path: "cursos", component: CursosListaComponent},
    {path: "cursos/cadastro", component: CursoCadastroComponent},
    {path: "alunos", component: AlunosListaComponent},
    {path: "cursos/editar/:id", component: CursoEditarComponent},
];
