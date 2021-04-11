import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import {GameScreenComponent} from './components/game-screen/game-screen.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ResultScreenComponent } from './components/result-screen/result-screen.component';

const routes: Routes = [
  {path: '', component: LoginScreenComponent},
  {path: 'game', component: GameScreenComponent},
  {path: 'game/result', component: ResultScreenComponent},
  {path: '**', component: PageNotFoundComponent} // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
