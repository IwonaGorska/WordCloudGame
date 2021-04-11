import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { FormsModule } from '@angular/forms';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ResultScreenComponent } from './components/result-screen/result-screen.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    GameScreenComponent,
    PageNotFoundComponent,
    ResultScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
