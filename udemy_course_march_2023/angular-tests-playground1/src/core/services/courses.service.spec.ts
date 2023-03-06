import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Course } from '../models/course';
import { COURSES, LESSONS, findCourseById, findLessonsForCourse } from 'server/db-data';
import { Lesson } from '../models/lesson';

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

  it('should save the course data', () => {
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

  it('should give an error if save course fails', () => {
    const data = { titles: {
      description: 'Testing course gigi!'
    } };
    coursesService.saveCourse(12, data).subscribe(
      () => fail('the save course operation should have failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        // expect(error.message).toContain('save course failed')
      }
    );

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    req.flush('save course failed', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });

  describe('.findLesson', () => {
    it('should find a list of lessons', () => {
      coursesService.findLessons(12).subscribe((lessons: Lesson[]) => {
        expect(lessons).toBeTruthy();

        expect(lessons.length).toBe(3);
      })

      // '/api/lessons?courseId=12pageSize=3'
      const req = httpTestingController.expectOne(req => req.url === '/api/lessons');
      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('courseId')).toEqual('12');
      expect(req.request.params.get('filter')).toEqual('');
      expect(req.request.params.get('sortOrder')).toEqual('asc');
      expect(req.request.params.get('pageNumber')).toEqual('0');

      req.flush({
        payload: findLessonsForCourse(12).slice(0, 3)
      });
    });

  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
