import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMovieDialogComponent } from './get-movie-dialog.component';

describe('GetMovieDialogComponent', () => {
  let component: GetMovieDialogComponent;
  let fixture: ComponentFixture<GetMovieDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMovieDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMovieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
