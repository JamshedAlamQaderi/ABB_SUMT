import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailCardComponent } from './user-detail-card.component';

describe('UserDetailCardComponent', () => {
  let component: UserDetailCardComponent;
  let fixture: ComponentFixture<UserDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
