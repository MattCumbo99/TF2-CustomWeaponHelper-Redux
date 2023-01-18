import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './pages/page-not-found.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        PageNotFoundComponent,
    ],
    exports: [PageNotFoundComponent]
})
export class BaseModule {

}
