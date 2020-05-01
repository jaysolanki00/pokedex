import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokeThemeComponent } from './poke-theme/poke-theme.component';
import { HttpClientModule } from '@angular/common/http';
import { PokeCardComponent } from './poke-theme/poke-card/poke-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PokeThemeComponent,
    PokeCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
