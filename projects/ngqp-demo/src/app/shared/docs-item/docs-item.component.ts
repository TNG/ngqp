import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {Fragment, FragmentsService} from '../docs-fragment/fragments.service';
import {ActivatedRoute} from '@angular/router';
import {getPageForRoute} from '../../demo-docs.routes';
import {DocsPage} from '../../docs-page';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'docs-item',
    templateUrl: './docs-item.component.html',
    styleUrls: [ './docs-item.component.scss' ],
    providers: [ FragmentsService ],
})
export class DocsItemComponent implements OnInit, OnDestroy {

    public docsPage: DocsPage;

    public menuIcon = faBars;
    public navigationCollapsed = true;

    public fragments: Fragment[] = [];

    private readonly destroy$ = new Subject<void>();

    constructor(private fragmentService: FragmentsService,
                private cdRef: ChangeDetectorRef,
                private route: ActivatedRoute) {
        this.docsPage = getPageForRoute(this.route.snapshot.url.join('/'));
    }

    public ngOnInit() {
        this.fragmentService.fragments$.pipe(
            takeUntil(this.destroy$),
        ).subscribe(fragments => {
            this.fragments = fragments;
            this.cdRef.detectChanges();
        });
    }

    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
