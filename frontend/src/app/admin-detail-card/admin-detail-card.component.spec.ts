import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailCardComponent } from './admin-detail-card.component';

describe('AdminDetailCardComponent', () => {
  let component: AdminDetailCardComponent;
  let fixture: ComponentFixture<AdminDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
