import { HttpClient, HttpClientModule, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { JwtInterceptorService } from './jwt-interceptor.service';

describe('JwtInterceptorService', () => {
  let service: JwtInterceptorService;
  let httpTestControl : HttpTestingController;
  let httpClient : HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule, HttpClientTestingModule],
      providers: [ 
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorService,
            multi: true
        }]
    });
    service = TestBed.inject(JwtInterceptorService);
    httpTestControl = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(()=>{
    httpTestControl = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestControl.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('[Interceptor - Check]', () => {
    let token = "abcdefg";
    let value = "dhurfa";
    localStorage.setItem(token , value);
    let res = localStorage.getItem(token);
    expect(res).toEqual(value);
  });

  it('[Headers - Check]', () => {
    httpClient.get('/User/login').subscribe();
    const req = httpTestControl.expectOne('/User/login');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer null');
  });
});
