import { areEqualUsing, isFunction, isMissing, isPresent, LOOSE_IDENTITY_COMPARATOR, undefinedToNull, wrapTryCatch } from './util';
import { Comparator } from './types';

describe(isMissing.name, () => {
    it('returns true for undefined', () => expect(isMissing(undefined)).toBe(true));
    it('returns true for null', () => expect(isMissing(null)).toBe(true));

    it('returns false for empty string', () => expect(isMissing('')).toBe(false));
    it('returns false for zero', () => expect(isMissing(0)).toBe(false));
    it('returns false for empty array', () => expect(isMissing([])).toBe(false));
    it('returns false for empty object', () => expect(isMissing({})).toBe(false));
});

describe(isPresent.name, () => {
    it('returns false for undefined', () => expect(isPresent(undefined)).toBe(false));
    it('returns false for null', () => expect(isPresent(null)).toBe(false));

    it('returns true for empty string', () => expect(isPresent('')).toBe(true));
    it('returns true for zero', () => expect(isPresent(0)).toBe(true));
    it('returns true for empty array', () => expect(isPresent([])).toBe(true));
    it('returns true for empty object', () => expect(isPresent({})).toBe(true));
});

describe(undefinedToNull.name, () => {
    it('converts undefined to null', () => expect(undefinedToNull(undefined)).toBe(null));
    it('converts null to null', () => expect(undefinedToNull(null)).toBe(null));
    it('converts 42 to 42', () => expect(undefinedToNull(42)).toBe(42));
});

describe(isFunction.name, () => {
    it('returns true for a function', () => expect(isFunction(() => void 0)).toBe(true));

    it('returns false for null', () => expect(isFunction(null)).toBe(false));
    it('returns false for undefined', () => expect(isFunction(undefined)).toBe(false));
});

describe(wrapTryCatch.name, () => {
    beforeEach(() => spyOn(console, 'error'));

    it('returns the original value if there is no error', () => {
        const fn = () => 42;
        const wrappedFn = wrapTryCatch(fn, 'Error');

        expect(wrappedFn()).toBe(42);
    });

    it('applies provided parameters to the wrapped function', () => {
        const fn = (a: number, b: number) => a + b;
        const wrappedFn = wrapTryCatch(fn, 'Error');

        expect(wrappedFn(1, 2)).toBe(3);
    });

    it('returns null if the wrapped function errored', () => {
        const err = new Error('ERROR!');
        const fn = () => {
            throw err;
        };

        const wrappedFn = wrapTryCatch(fn, 'Test');
        expect(wrappedFn()).toBeNull();
        expect(console.error).toHaveBeenCalledWith('Test', err);
    });
});

describe(LOOSE_IDENTITY_COMPARATOR.name, () => {
    ([
        [null, null],
        [undefined, undefined],
        [null, undefined],
        [undefined, null],
        [42, 42],
        ['Test', 'Test'],
        [true, true],
    ] as [any, any][]).forEach(([a, b]) => {
        it(`returns true for ${a} / ${b}`,
            () => expect(LOOSE_IDENTITY_COMPARATOR(a, b)).toBe(true));
    });

    ([
        [1, null],
        [1, undefined],
        ['', null],
        ['', undefined],
        [42, 1337],
        ['Foo', 'Bar'],
        [true, false],
        [{}, {}],
    ] as [any, any][]).forEach(([a, b]) => {
        it(`returns false for ${a} / ${b}`,
            () => expect(LOOSE_IDENTITY_COMPARATOR(a, b)).toBe(false));
    });
});

describe(areEqualUsing.name, () => {
    const numericComparator: Comparator<number> = (a, b) => b - a;

    it('returns true if a boolean comparator returns true', () =>
        expect(areEqualUsing(42, 42, LOOSE_IDENTITY_COMPARATOR)).toBe(true)
    );

    it('returns false if a boolean comparator returns false', () =>
        expect(areEqualUsing(42, 1337, LOOSE_IDENTITY_COMPARATOR)).toBe(false)
    );

    it('returns true if a numeric comparator returns 0', () =>
        expect(areEqualUsing(42, 42, numericComparator)).toBe(true)
    );

    it('returns false if a numeric comparator returns a non-zero value', () =>
        expect(areEqualUsing(42, 1337, numericComparator)).toBe(false)
    );
});