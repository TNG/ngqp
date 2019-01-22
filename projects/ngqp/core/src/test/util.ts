import { Observable, ConnectableObservable } from 'rxjs';
import { publishReplay } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

/** See https://github.com/angular/angular/issues/25837 */
export function setupNavigationWarnStub() {
    const warn = console.warn;

    spyOn(console, 'warn').and.callFake((...args: any[]) => {
        const [firstArg] = args;
        if (typeof firstArg === 'string' && firstArg.startsWith('Navigation triggered outside Angular zone')) {
            return;
        }

        return warn.apply(console, args);
    });
}

export const scheduler: TestScheduler = new TestScheduler((actual, expected) =>
    expect(actual).toEqual(expected)
);

export function captureObservable<T>(source$: Observable<T>): Observable<T> {
    const captured$ = source$.pipe(publishReplay()) as ConnectableObservable<T>;
    captured$.connect();
    return captured$;
}