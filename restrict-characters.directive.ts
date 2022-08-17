import {
  Directive,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ecmRestrictCharacters]',
})
export class RestrictCharactersDirective implements OnInit {
  @Input() ecmRestrictCharacters = /(?:)/;
  private regExp: RegExp | undefined;

  constructor(private renderer: Renderer2, private ngControl: NgControl) {}

  ngOnInit(): void {
    this.regExp = new RegExp(this.ecmRestrictCharacters, 'gm');
  }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    this.updateHostAndControlValue(event);
  }

  @HostListener('change', ['$event'])
  onChange(event: Event) {
    this.updateHostAndControlValue(event);
  }

  private updateHostAndControlValue(event: Event) {
    const newValue = (<HTMLInputElement>event.target).value.replace(
      this.regExp || '',
      '',
    );
    this.renderer.setProperty(
      <HTMLInputElement>event.target,
      'value',
      newValue,
    );
    this.ngControl.control?.setValue(newValue);
  }
}
