import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service instanceof CalculatorService).toBe(true);
  });

  it('should add two numbers', () => {
    // pending('gigi');
    expect(service.add(1, 2)).toBe(3);
  });

  it('should subtract two numbers', () => {
    // fail("something went wrong");
    expect(service.subtract(2, 1)).toBe(1, '<custom message>');
  });
});
