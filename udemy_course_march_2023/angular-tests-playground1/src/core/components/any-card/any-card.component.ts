import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-any-card',
  templateUrl: './any-card.component.html',
  styleUrls: ['./any-card.component.scss']
})
export class AnyCardComponent {

  @Input() title?: string;

  @Input() imageUrl?: string;

  @Input() description?: string;

  @Input() notes?: string;

  constructor(

  ) { }

  ngOnInit(): void {}

  sayHi(): void {
    console.log('hi');
  }

  sayNo(): void {
    console.log('no');
  }

}
