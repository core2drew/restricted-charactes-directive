import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestrictCharactersDirective } from './restrict-characters.directive';

@NgModule({
  declarations: [RestrictCharactersDirective],
  imports: [CommonModule],
  exports: [RestrictCharactersDirective],
})
export class RestrictCharactersModule {}
