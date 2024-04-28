import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifyModalComponent } from './notify-modal.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

let component: NotifyModalComponent;
let fixture: ComponentFixture<NotifyModalComponent>;
let divDE_AB: DebugElement;
let divDE_BD: DebugElement;
let errorSample: Error;
describe('NotifyModalComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      //
      imports: [NotifyModalComponent],
    });
    fixture = TestBed.createComponent(NotifyModalComponent);
    component = fixture.componentInstance;
    divDE_AB = fixture.debugElement.query(By.css('div.alert-box'));
    divDE_BD = fixture.debugElement.query(By.css('div.backdrop'));
    errorSample = { name: 'NameTest', message: 'MessageTest' };
  });
  it('should create Component Instance and its defined Template', () => {
    expect(component).toBeTruthy();
    expect(divDE_AB).toBeTruthy();
    expect(divDE_BD).toBeTruthy();
  });
  it('Should have "errorMessage" Property with object type which contain "name", "message" string type properties', () => {
    component.errorMessage = errorSample;
    expect(component.errorMessage).toEqual(errorSample);
  });
  it('"errorMessage" Property can be undefined', () => {
    component.errorMessage = undefined;
    expect(component.errorMessage).toBe(undefined);
  });
  it('should Raise an  "onClose<EventEmitter>" when Invoke a method "onCloseModal()"', () => {
    let eventRaised = false;
    component.onCLose.subscribe(() => {
      eventRaised = true;
    });
    component.onCloseModal();
    expect(eventRaised).toBeTrue();
  });
  it('should Render an Alert Text Message in Defined Places', () => {
    const errorTextArr = <string[]>Object.values(errorSample);
    component.errorMessage = errorSample;
    fixture.detectChanges();

    const textParagraphs = divDE_AB.queryAll(By.css('p'));

    const length = textParagraphs.length;
    for (let i = 0; i < length; i++) {
      const textContent = (<HTMLParagraphElement>(
        textParagraphs[i].nativeElement
      )).textContent;
      expect(textContent).toContain(errorTextArr[i]);
    }
  });

  it('should render  "OK" button with (click) Event which handle "onCloseModal()" method', () => {
    spyOn(component, 'onCloseModal');
    const buttonDE = divDE_AB.query(By.css('button'));

    const buttonNative = <HTMLButtonElement>buttonDE.nativeElement;
    expect(buttonNative.textContent).toContain('OK');

    buttonDE.triggerEventHandler('click');
    expect(component.onCloseModal).toHaveBeenCalled();
  });
});
