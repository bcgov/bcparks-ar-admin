import { ApplicationRef, APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggerService } from './services/logger.service';
import { DataService } from './services/data.service';
import { EventService } from './services/event.service';
import { ToastService } from './services/toast.service';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { ToggleButtonModule } from './shared/components/toggle-button/toggle-button.module';
import { BreadcrumbModule } from './shared/components/breadcrumb/breadcrumb.module';
import { ExportReportsModule } from './export-reports/export-reports.module';
import { EnterDataModule } from './enter-data/enter-data.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { HomeModule } from './home/home.module';
import { KeycloakService } from './services/keycloak.service';
import { TokenInterceptor } from './shared/utils/token-interceptor';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { ApiService } from './services/api.service';
import { AutoFetchService } from './services/auto-fetch.service';
import { InfiniteLoadingBarModule } from './shared/components/infinite-loading-bar/infinite-loading-bar.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingService } from './services/loading.service';

export function initConfig(
  configService: ConfigService,
  apiService: ApiService,
  autoFetchService: AutoFetchService,
  keycloakService: KeycloakService
) {
  return async () => {
    await configService.init();
    apiService.init();
    await keycloakService.init();
    autoFetchService.run();
  };
}

@NgModule({
  declarations: [AppComponent, NotAuthorizedComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    SidebarModule,
    ToggleButtonModule,
    BreadcrumbModule,
    ExportReportsModule,
    EnterDataModule,
    HeaderModule,
    FooterModule,
    HomeModule,
    InfiniteLoadingBarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService, ApiService, AutoFetchService, KeycloakService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    ConfigService,
    KeycloakService,
    LoggerService,
    DataService,
    EventService,
    ToastService,
    AutoFetchService,
    LoadingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(applicationRef: ApplicationRef) {
    Object.defineProperty(applicationRef, '_rootComponents', {
      get: () => applicationRef['components'],
    });
  }
}
