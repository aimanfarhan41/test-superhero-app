import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent }      from './hero/hero.component';
import { SearchComponent }      from './search/search.component';


const routes: Routes = [
  { path: 'heroes', component: HeroComponent },
  { path: 'search', component: SearchComponent },
  { path: '',   redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }

