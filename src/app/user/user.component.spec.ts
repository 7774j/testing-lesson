import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
  it('should use the user name from the service', () => {
    let fixture = TestBed.createComponent(UserComponent);
    component  = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.user.name).toEqual(component.user.name);
  });
  it('should display the user name if the user is logged in', () => {
    let fixture = TestBed.createComponent(UserComponent);
    component  = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    component.isLoggedIn = true;
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(component.user.name);
  });
  it('shouldn\'t display the user name if the user is not logged in', () => {
    let fixture = TestBed.createComponent(UserComponent);
    component  = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(component.user.name);
  });
});
