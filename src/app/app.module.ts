import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Import your components and services
import { UserDisplayService } from './services/user-display.service';

@NgModule({
  declarations: [
    AppComponent,
    // Your components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // Other imports
  ],
  providers: [
    UserDisplayService,
    // Other services
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }