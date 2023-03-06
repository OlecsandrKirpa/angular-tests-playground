import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(
    private readonly logger: LoggerService
  ) { }

  add(a: number, b: number): number {
    this.logger.log("add", [a, b]);
    return a + b;
  }

  subtract(a: number, b: number): number {
    this.logger.log("subtract", [a, b]);
    return a - b;
  }
}
