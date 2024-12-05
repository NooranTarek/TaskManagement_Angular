import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([authInterceptor])),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideToastr(),provideAnimations(), provideAnimationsAsync(), { provide: MAT_DIALOG_DATA, useValue: {} },
  { provide: MatDialogRef, useValue: {} },]
};
