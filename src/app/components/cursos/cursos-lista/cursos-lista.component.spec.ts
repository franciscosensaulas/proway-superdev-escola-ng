import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosListaComponent } from './cursos-lista.component';

describe('CursosListaComponent', () => {
  let component: CursosListaComponent;
  let fixture: ComponentFixture<CursosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
