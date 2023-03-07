import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";

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
      console.log('test 1');
    })

    setTimeout(() =>
      setTimeout(() => {
        test = true;
        console.log('test 2');
      })
      , 1000);

    flush();

    // tick(1000);

    expect(test).toBeTruthy();
  }));

  // it('with async/await', async () => {
  //   let test = false;

  //   setTimeout(() => {
  //     test = true;
  //   }, 1000);

  //   await expectAsync(test).toBeTrue();
  // });
});