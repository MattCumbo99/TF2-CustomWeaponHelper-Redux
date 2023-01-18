import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomizerModule } from './modules/customizer/customizer.module';
import { BaseModule } from './modules/base/base.module';
import { CustomizerRoutingModule } from './modules/base/base-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CustomizerRoutingModule,
    CustomizerModule,
    BaseModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
