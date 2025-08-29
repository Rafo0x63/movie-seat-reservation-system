import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterList } from './theater-list';

describe('TheaterList', () => {
  let component: TheaterList;
  let fixture: ComponentFixture<TheaterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheaterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
