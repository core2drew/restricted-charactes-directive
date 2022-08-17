import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import {
  createDirectiveFactory,
  mockProvider,
  SpectatorDirective,
} from '@ngneat/spectator/jest';

import { RestrictCharactersDirective } from './restrict-characters.directive';
import { RestrictCharactersModule } from './restrict-characters.module';

describe('RestrictCharactersDirective', () => {
  let spec: SpectatorDirective<RestrictCharactersDirective>;

  const createDirective = createDirectiveFactory({
    directive: RestrictCharactersDirective,
    imports: [RestrictCharactersModule, FormsModule, ReactiveFormsModule],
    providers: [mockProvider(NgControl)],
  });

  it('should create an instance', () => {
    spec = createDirective(
      "<input ecmRestrictCharacters='\\d+' type='text' />",
    );
    expect(spec.directive).toBeTruthy();
  });

  it('should allow to input character when it is not restricted', () => {
    spec = createDirective(
      `<input ecmRestrictCharacters='\\d+' type='text' />`,
    );

    spec.typeInElement('C', spec.element);
    spec.blur(spec.element);
    expect(spec.element as HTMLInputElement).toHaveValue('C');
  });

  it('should not allow to input characters when it is restricted', () => {
    spec = createDirective(
      `<input ecmRestrictCharacters='\\d+' type='text' />`,
    );

    spec.typeInElement('1A', spec.element);
    spec.blur(spec.element);
    expect(spec.element as HTMLInputElement).toHaveValue('A');
  });
});
