import { ApplicationRef, NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { LoginComponent } from './login/login.component';
import { ApiService } from './services/api.service';
import { AutoFetchService } from './services/auto-fetch.service';
import { InfiniteLoadingBarModule } from './shared/components/infinite-loading-bar/infinite-loading-bar.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingService } from './services/loading.service';
import { LockRecordsModule } from './lock-records/lock-records.module';
import { VarianceSearchModule } from './variance-search/variance-search.module';
import { HistoricalPillModule } from './shared/components/historical-pill/historical-pill.module';
import { ManageSubareasModule } from './manage-subareas/manage-subareas.module';

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
    if (keycloakService.isAuthorized()) {
      autoFetchService.run();
    }
  };
}

@NgModule({ declarations: [AppComponent, NotAuthorizedComponent, LoginComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        CommonModule,
        AppRoutingModule,
        SidebarModule,
        ToggleButtonModule,
        BreadcrumbModule,
        ExportReportsModule,
        EnterDataModule,
        LockRecordsModule,
        HeaderModule,
        FooterModule,
        HomeModule,
        InfiniteLoadingBarModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        VarianceSearchModule,
        HistoricalPillModule,
        ManageSubareasModule], providers: [
        provideAppInitializer(() => {
        const initializerFn = (initConfig)(inject(ConfigService), inject(ApiService), inject(AutoFetchService), inject(KeycloakService));
        return initializerFn();
      }),
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
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {
  constructor(applicationRef: ApplicationRef) {
    Object.defineProperty(applicationRef, '_rootComponents', {
      get: () => applicationRef['components'],
    });
  }
}
