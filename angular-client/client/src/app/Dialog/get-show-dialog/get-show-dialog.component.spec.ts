import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetShowDialogComponent } from './get-show-dialog.component';

describe('GetShowDialogComponent', () => {
  let component: GetShowDialogComponent;
  let fixture: ComponentFixture<GetShowDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetShowDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetShowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
