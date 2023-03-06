import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AnyCardComponent } from './any-card.component';
import { AnyCardModule } from './any-card.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AnyCardComponent', () => {
  let component: AnyCardComponent;
  let fixture: ComponentFixture<AnyCardComponent>;
  let el: DebugElement;

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
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show title', () => {
    component.title = 'Test Title';
    expect(component.title).toBe('Test Title');
    fixture.detectChanges();
    const items = el.queryAll(By.css('h3'));

    expect(items.length).toBe(1);

    items.forEach((h1: DebugElement) => {
      expect(h1.nativeElement.textContent).toBe('Test Title');
      expect(h1.nativeElement.textContent).not.toBe('Test Title 2');
    });
  });
});
