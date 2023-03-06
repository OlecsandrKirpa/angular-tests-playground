import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Course } from '../models/course';
import { COURSES } from 'server/db-data';

describe('CoursesService', () => {
  let coursesService: CoursesService,
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
    coursesService = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(coursesService).toBeTruthy();
  });

  it('should retrieve all courses', () => {
    coursesService.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy('No courses returned');
      if (courses) {
        const course: Course | undefined = courses.find(course => course.id === 12);
        expect(course).toBeTruthy('Could not find course with id: 12');
        expect(course?.id).toBe(12);
      } else {
        fail('No courses returned');
      }
    });

    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
    req.flush({ payload: Object.values(COURSES) });
  });

  describe('.findCourseById', () => {
    it('should retrieve course by id', () => {
      coursesService.findCourseById(12).subscribe(course => {
        expect(course).toBeTruthy();
        expect(course?.id).toBe(12);
      });

      const req = httpTestingController.expectOne('/api/courses/12');
      expect(req.request.method).toEqual('GET');
      req.flush(COURSES[12]);
    });

    it('should raise error if required id is different from the expected', () => {
      coursesService.findCourseById(12).subscribe(course => {
        expect(course?.id).not.toBe(12);
      });

      const req = httpTestingController.expectOne('/api/courses/12');
      expect(req.request.method).toEqual('GET');
      req.flush(COURSES[1]);
    });

  });

  fit('should save the course data', () => {
    const data = { titles: {
      description: 'Testing course gigi!'
    } };
    coursesService.saveCourse(12, data).subscribe(course => {
      expect(course?.id).toBe(12);
      expect(course?.titles.description).toBe(data.titles.description);
    });

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.titles.description).toEqual(data.titles.description);
    req.flush({
      ...COURSES[12],
      ...data,
      // ...{ id: 13 } // Uncomment to see the test fail
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
