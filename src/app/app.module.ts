import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';
import { HttpClientModule } from '@angular/common/http';
import { LoggerService } from './services/logger.service';
import { DataService } from './services/data.service';
import { EventService } from './services/event.service';
import { ToastService } from './services/toast.service';
import { EnterDataComponent } from './enter-data/enter-data.component';
import { ExportReportsComponent } from './export-reports/export-reports.component';

export function initConfig(configService: ConfigService) {
  return async () => {
    await configService.init();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    EnterDataComponent,
    ExportReportsComponent,
  ],
  imports: [BrowserModule, CommonModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true,
    },
    ConfigService,
    LoggerService,
    DataService,
    EventService,
    ToastService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
