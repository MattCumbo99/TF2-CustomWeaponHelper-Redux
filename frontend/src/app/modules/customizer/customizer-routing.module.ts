import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomizerComponent } from './pages/generate-weapon/customizer.component';

const moduleRoutes: Routes = [
    { path: 'customizer', component: CustomizerComponent },
    { path: 'customizer/test', component: CustomizerComponent },
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
