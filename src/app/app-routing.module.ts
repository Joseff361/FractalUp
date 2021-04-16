import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue.component';

const routes: Routes = [
  { path: 'search/:keyword', component: CatalogueComponent},
  { path: 'catalogue', component: CatalogueComponent},
  { path: 'chanel.html', redirectTo: '/chanel.thml'},
  { path: '', redirectTo: '/catalogue', pathMatch: 'full'},
  { path: '**', redirectTo: '/catalogue', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
