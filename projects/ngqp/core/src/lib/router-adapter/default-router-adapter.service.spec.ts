import { async, TestBed } from '@angular/core/testing';
import { DefaultRouterAdapter } from './default-router-adapter.service';
import { ActivatedRoute, Router } from '@angular/router';

describe(DefaultRouterAdapter.name, () => {
    const mockRouter = { navigate: jasmine.createSpy('navigate') };
    const mockRoute = {};
    let adapter: DefaultRouterAdapter;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockRoute },
                DefaultRouterAdapter
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        adapter = TestBed.get(DefaultRouterAdapter);
    });

    it('sets the correct navigation parameters', () => {
        const params = { foo: 42 };

        adapter.navigate(params);
        expect(mockRouter.navigate).toHaveBeenCalledWith([], {
            relativeTo: mockRoute,
            queryParamsHandling: 'merge',
            queryParams: params,
        });
    });

    it('merges in extra navigation parameters', () => {
        const params = { foo: 42 };

        adapter.navigate(params, { replaceUrl: true });
        expect(mockRouter.navigate).toHaveBeenCalledWith([], {
            relativeTo: mockRoute,
            queryParamsHandling: 'merge',
            queryParams: params,
            replaceUrl: true,
        });
    });
});