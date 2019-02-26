import { QueryParamModule } from '@ngqp/core';

@NgModule({
    imports: [
        QueryParamModule.withConfig({
            routerOptions: {
                replaceUrl: false,
            },
        }),
    ],
})
export class AppModule {}
