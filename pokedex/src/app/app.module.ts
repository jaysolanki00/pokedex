import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PokeThemeComponent } from './poke-theme/poke-theme.component';
import { HttpClientModule } from '@angular/common/http';
import { PokeCardComponent } from './poke-theme/poke-card/poke-card.component';
import { InfiniteScrollComponent } from './poke-theme/infinite-scroll/infinite-scroll.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PokeService } from './poke-theme/poke.service';
import { LoadingspinnerComponent } from './shared/templates/loadingspinner/loadingspinner.component';

@NgModule({
  declarations: [
    AppComponent,
    PokeThemeComponent,
    PokeCardComponent,
    InfiniteScrollComponent,
    LoadingspinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [PokeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
