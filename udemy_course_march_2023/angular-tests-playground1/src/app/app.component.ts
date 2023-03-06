import { Component } from '@angular/core';
import { AnyCardSampleData } from 'src/core/components/any-card/sample-data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-tests-playground1';

  readonly data = AnyCardSampleData;
}
