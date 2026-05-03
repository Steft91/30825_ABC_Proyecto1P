import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clippy } from './clippy';

describe('Clippy', () => {
  let component: Clippy;
  let fixture: ComponentFixture<Clippy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clippy],
    }).compileComponents();

    fixture = TestBed.createComponent(Clippy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
