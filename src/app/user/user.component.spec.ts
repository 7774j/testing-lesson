import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service'

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
  it('should\'t fetch data successfully if not called asynchronously', () => {
    let fixture = TestBed.createComponent(UserComponent);
    component  = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
    .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    expect(component.data).toBe(undefined);
  });
  it('should fetch data successfully if called asynchronously', async(() => {
    let fixture = TestBed.createComponent(UserComponent);
    component  = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
    .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    fixture.whenStable().then(() =>{
      expect(component.data).toBe('Data');
    });
  }));
    it('should fetch data successfully if called asynchronously', fakeAsync(() => {
      let fixture = TestBed.createComponent(UserComponent);
      component  = fixture.debugElement.componentInstance;
      let dataService = fixture.debugElement.injector.get(DataService);
      let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
      fixture.detectChanges();
      tick();
      expect(component.data).toBe('Data');

  }));
});
