/** See https://github.com/angular/angular/issues/25837 */
import { Comparator } from '../lib/types';

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