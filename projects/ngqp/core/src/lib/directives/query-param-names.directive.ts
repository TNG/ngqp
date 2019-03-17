import {
    Directive,
    forwardRef,
    InjectFlags,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Provider,
    SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Deflator, Inflator } from '../types';
import { QueryParamGroupService } from './query-param-group.service';
import { selectValueAccessor } from '../accessors/util';
import { NOP } from '../util';

const QUERY_PARAM_NAMES_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QueryParamNamesDirective),
    multi: true,
};

/**
 * TODO #90: Documentation
 */
@Directive({
    selector: '[queryParamNames]',
    providers: [QUERY_PARAM_NAMES_ACCESSOR],
})
export class QueryParamNamesDirective implements ControlValueAccessor, OnChanges, OnDestroy {

    @Input('queryParamNames')
    public names: string[];

    @Input('inflate')
    public inflate: Inflator<unknown> = (value => [value]);

    @Input('deflate')
    public deflate: Deflator<unknown> = (values => values[0]);

    private innerAccessor: ControlValueAccessor | null = null;
    // TODO #90: Map is not suitable, use better type
    private values = new Map<string, unknown>();
    // TODO #90: Map is not suitable, use better type
    private fnChange = new Map<string, Function>();
    private fnTouched = () => {};

    /** @internal */
    constructor(
        @Optional() private groupService: QueryParamGroupService,
        private injector: Injector,
    ) {
        if (!this.groupService) {
            throw new Error(`No parent configuration found. Did you forget to add [queryParamGroup]?`);
        }

        Promise.resolve().then(() => {
            const valueAccessors: ControlValueAccessor[] = this.injector.get<any>(NG_VALUE_ACCESSOR, null,
                InjectFlags.Optional | InjectFlags.Self);

            this.innerAccessor = selectValueAccessor(valueAccessors, this);
            this.innerAccessor.registerOnTouched(() => this.fnTouched());

            this.innerAccessor.registerOnChange((value: unknown) => {
                const inflated = this.inflate(value);
                Array.from(this.fnChange.values()).forEach((fn, idx) => fn(inflated[idx]));
            });
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // TODO #90: Handle changes, validate, …
        this.names.forEach(queryParamName => this.groupService.registerQueryParamAccessor({
            name: queryParamName,
            valueAccessor: this,
        }));
    }

    public ngOnDestroy(): void {
        this.innerAccessor.registerOnTouched(NOP);
        this.innerAccessor.registerOnChange(NOP);

        // TODO #90: Deregister correctly
    }

    public writeValue(value: unknown) {
        this.values.set(this.groupService.currentQueryParamName, value);

        const deflated = this.deflate(Array.from(this.values.values()));
        this.innerAccessor.writeValue(deflated);
    }

    public registerOnChange(fn: any) {
        this.fnChange.set(this.groupService.currentQueryParamName, fn);
    }

    public registerOnTouched(fn: any) {
        this.fnTouched = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.innerAccessor.setDisabledState(isDisabled);
    }

}