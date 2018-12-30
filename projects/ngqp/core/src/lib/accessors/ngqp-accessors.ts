import { RangeControlValueAccessorDirective } from './range-control-value-accessor.directive';
import { NumberControlValueAccessorDirective } from './number-control-value-accessor.directive';
import { DefaultControlValueAccessorDirective } from './default-control-value-accessor.directive';
import { CheckboxControlValueAccessorDirective } from './checkbox-control-value-accessor.directive';
import { SelectControlValueAccessorDirective } from './select-control-value-accessor.directive';
import { MultiSelectControlValueAccessorDirective } from './multi-select-control-value-accessor.directive';

export const NGQP_BUILT_IN_ACCESSORS = [
    DefaultControlValueAccessorDirective,
    NumberControlValueAccessorDirective,
    RangeControlValueAccessorDirective,
    CheckboxControlValueAccessorDirective,
    SelectControlValueAccessorDirective,
    MultiSelectControlValueAccessorDirective,
];