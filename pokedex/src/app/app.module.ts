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
import { TypeComponent } from './poke-theme/type/type.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomDialogComponent } from './shared/templates/custom-dialog/custom-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    PokeThemeComponent,
    PokeCardComponent,
    InfiniteScrollComponent,
    LoadingspinnerComponent,
    TypeComponent,
    CustomDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    ServiceWorkerModule.register('sw.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  providers: [PokeService],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomDialogComponent
 ]
})
export class AppModule { }
