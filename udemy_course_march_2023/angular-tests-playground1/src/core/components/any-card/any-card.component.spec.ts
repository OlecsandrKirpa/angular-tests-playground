import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AnyCardComponent } from './any-card.component';
import { AnyCardModule } from './any-card.module';

describe('AnyCardComponent', () => {
  let component: AnyCardComponent;
  let fixture: ComponentFixture<AnyCardComponent>;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports: [
        AnyCardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyCardComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
});
