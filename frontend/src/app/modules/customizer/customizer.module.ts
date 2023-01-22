import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { CustomizerComponent } from './pages/generate-weapon/customizer.component';
import { CustomizerRoutingModule } from './customizer-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { EnumToArrayPipe } from "../../shared/pipes/enumtoarray-pipe";

@NgModule({
    imports: [
        CustomizerRoutingModule,
        CommonModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatSelectModule,
        MatTabsModule,
        MatTableModule,
        ReactiveFormsModule,
    ],
    declarations: [
        CustomizerComponent,
        EnumToArrayPipe
    ],
    exports: []
})
export class CustomizerModule {

}
