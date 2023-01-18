import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomizerComponent} from './pages/customizer/customizer.component';

const routes: Routes = [
  { path: 'main', component: CustomizerComponent },
  { path: '', component: CustomizerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
