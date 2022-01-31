import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeThemeComponent } from './poke-theme.component';

describe('PokeThemeComponent', () => {
  let component: PokeThemeComponent;
  let fixture: ComponentFixture<PokeThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
