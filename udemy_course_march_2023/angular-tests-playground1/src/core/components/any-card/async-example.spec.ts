import { fakeAsync, flush, flushMicrotasks, tick, waitForAsync } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

describe('async texamples', () => {
  it('with setTimeout()', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('with fakeAsync()', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      // console.log('test 1');
    })

    setTimeout(() =>
      setTimeout(() => {
        test = true;
        // console.log('test 2');
      })
      , 1000);

    flush();

    // tick(1000);

    expect(test).toBeTruthy();
  }));

  it('async test example - plain Promise', fakeAsync(() => {
    let test = false;

    // console.log('Creating promise');

    // setTimeout(() => console.log('setTimeout 1 callback called'))

    // setTimeout is a "macrotask" or a "task"
    // setTimeout(() => console.log('setTimeout 2 callback called'))

    // Promise is a "microtask"
    Promise.resolve().then(() => {
      // console.log('Promise first then() evaluated successfully');
      return Promise.resolve();
    }).then(() => {
      // console.log('Promise second then() evaluated successfully');
      test = true;
    })

    flushMicrotasks();

    // console.log('End of test spec');

    expect(test).toBeTrue();
  }));

  it('mix example - plain Promise', fakeAsync(() => {
    let counter: number = 0;
    const add = (num: number) => counter += num;

    Promise.resolve().then(() => {
      add(10);

      setTimeout(() => {
        add(1);
      }, 1000)
    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);
    
    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);
  }));

  it('async test example - sync Observables with of(<value>)', () => {
    let test = false;

    // console.log('Creating observable');

    const test$ = of(test);

    test$.subscribe(() => {
      test = true;
    });

    // console.log('End of test spec');

    expect(test).toBeTrue();
  });

  it('async test example - Observables with delay', fakeAsync(() => {
    let test = false;

    // console.log('Creating observable');

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
      // console.log('test$ subscribe callback called');
    });

    tick(1000);

    // console.log('End of test spec');

    expect(test).toBeTrue();
  }));

  /**
   * The reason why we use waitForAsync is because it supports actual http requests.
   * If, for some reason, you need to fetch actual data from database or load external resources, you can use waitForAsync.
   */
  // it('async test example - Observables with delay (but woith waitForAsync())', waitForAsync(() => {
  //   let test = false;

  //   const test$ = of(test).pipe(delay(1000));

  //   test$.subscribe(() => {
  //     test = true;
  //   });

  // // fixture is typeof ComponentFixture<YourTestingComponent>;
  //   fixture.whenStable().then(() => {

  //     expect(test).toBeTrue();
  //   });

  // }));
});