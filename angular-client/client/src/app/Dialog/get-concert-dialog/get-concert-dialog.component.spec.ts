import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetConcertDialogComponent } from './get-concert-dialog.component';

describe('GetConcertDialogComponent', () => {
  let component: GetConcertDialogComponent;
  let fixture: ComponentFixture<GetConcertDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetConcertDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetConcertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
