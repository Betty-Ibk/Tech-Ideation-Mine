import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes, 
      withViewTransitions({ skipInitialTransition: true }),
      withInMemoryScrolling({ 
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    )
  ]
}).catch(err => console.error(err));