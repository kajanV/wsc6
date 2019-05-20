import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavPage } from './fav.page';

describe('FavPage', () => {
  let component: FavPage;
  let fixture: ComponentFixture<FavPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
