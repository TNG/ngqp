import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export interface Fragment {
    name: string;
    id: string;
    indent: number;
}

@Injectable()
export class FragmentsService implements OnDestroy {

    public readonly fragments$ = new BehaviorSubject<Fragment[]>([]);

    private readonly destroy$ = new Subject<void>();
    private fragments: Fragment[];

    constructor() {
        this.fragments$.pipe(
            takeUntil(this.destroy$),
        ).subscribe(fragments => this.fragments = fragments);
    }

    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public addFragment(item: Fragment) {
        this.fragments$.next([...this.fragments, item]);
    }

}
