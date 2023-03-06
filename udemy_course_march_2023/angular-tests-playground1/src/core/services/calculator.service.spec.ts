import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {

  it('spyOn logger.log', () => {
    const logger1 = new LoggerService();

    spyOn(logger1, 'log');

    const service1 = new CalculatorService(logger1);

    service1.add(1, 2);
    expect(logger1.log).toHaveBeenCalledWith('add', [1, 2]);
    expect(logger1.log).toHaveBeenCalledTimes(1)
  });

  it('jasmine.createSpyObj - logger.log', () => {
    const logger = jasmine.createSpyObj('LoggerService', ['log']);

    const service = new CalculatorService(logger);

    service.add(1, 2);
    expect(logger.log).toHaveBeenCalledWith('add', [1, 2]);
  });

  describe('with beforeEach', () => {
    let service: CalculatorService;
    let logger: LoggerService;

    beforeEach(() => {
      logger = new LoggerService();

      spyOn(logger, 'log');

      service = new CalculatorService(
        logger
      );

      // TestBed.configureTestingModule({});
      // service = TestBed.inject(CalculatorService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
      expect(service instanceof CalculatorService).toBe(true);
    });

    it('should add two numbers', () => {
      // pending('gigi');
      expect(service.add(1, 2)).toBe(3);
      expect(logger.log).toHaveBeenCalledWith('add', [1, 2]);
      expect(logger.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers', () => {
      // fail("something went wrong");
      expect(service.subtract(2, 1)).toBe(1, '<custom message>');
      expect(logger.log).toHaveBeenCalledWith('subtract', [2, 1]);
      expect(logger.log).toHaveBeenCalledTimes(1);
    });
  });

});
