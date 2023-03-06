import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

fdescribe('CoursesService', () => {
  let service: CoursesService,
    httpTestingController: HttpTestingController;


  beforeEach(() => {
    // const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CoursesService,
        // {
        //   provide: HttpClient,
        //   useValue: httpClientSpy
        // }
        // HttpClient,
      ]
    });

    // service = TestBed.inject(CoursesService);
    service = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all courses', () => {
    expect(service.findAllCourses()).toBeTruthy();
  });
});
