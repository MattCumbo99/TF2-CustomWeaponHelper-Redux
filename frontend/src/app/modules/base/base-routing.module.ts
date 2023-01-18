import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './pages/page-not-found.component';

const moduleRoutes: Routes = [
    { path: '404', component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(moduleRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CustomizerRoutingModule {

}
