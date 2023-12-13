import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ComputerAssemblyComponent } from './computer-assembly.component';

describe('ComputerAssemblyComponent', () => {
  let component: ComputerAssemblyComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let router: Router;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Router,
        { provide: HttpClient, useValue: httpClientSpyObj }
      ],
      declarations: [ComputerAssemblyComponent]
    })
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(ComputerAssemblyComponent);
    component = fixture.componentInstance;
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    router = TestBed.inject(Router);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set default form group values', () => {
    expect(component.form.value).toEqual({
      computerModel: '',
      delivery: '',
      phoneNumber: '',
      deliveryAddress: '',
      urgent: '0',
      payment: 'card',
      additionalInfo: ''
    });
  });

  describe('submit', () => {
    it('should send form data', () => {
      component.form.setValue({
        computerModel: 'lenovo',
        delivery: 'courier',
        phoneNumber: '380504672316',
        deliveryAddress: 'вул.Галицька, буд.56, кв.25',
        urgent: '1',
        payment: 'cash',
        additionalInfo: ''
      });

      httpClientSpy.post.and.returnValue(of({}));
      spyOn(component, 'returnBack');
      component.submit();

      expect(httpClientSpy.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/computer-assemblies',
        {
          computerModel: 'lenovo',
          delivery: 'courier',
          phoneNumber: '380504672316',
          deliveryAddress: 'вул.Галицька, буд.56, кв.25',
          urgent: '1',
          payment: 'cash',
          additionalInfo: ''
        }
      );
      expect(component.loading).toBeFalse();
      expect(component.returnBack).toHaveBeenCalled();
    });
  });

  describe('returnBack', () => {
    it('should call router navigate method', () => {
      spyOn(router, 'navigate');
      component.returnBack();

      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
