import { QueryParamModule } from '@ngqp/core';

@NgModule({
    imports: [
        QueryParamModule.withConfig({
            routerOptions: {
                preserveFragment: false,
            },
        }),
    ],
})
export class AppModule {}
