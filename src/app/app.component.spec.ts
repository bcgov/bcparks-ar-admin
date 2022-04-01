import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { EnterDataModule } from './enter-data/enter-data.module';
import { ExportReportsModule } from './export-reports/export-reports.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { ConfigService } from './services/config.service';
import { DataService } from './services/data.service';
import { EventService } from './services/event.service';
import { LoggerService } from './services/logger.service';
import { ToastService } from './services/toast.service';
import { BreadcrumbModule } from './shared/components/breadcrumb/breadcrumb.module';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { ToggleButtonModule } from './shared/components/toggle-button/toggle-button.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        SidebarModule,
        ToggleButtonModule,
        BreadcrumbModule,
        ExportReportsModule,
        EnterDataModule,
        HeaderModule,
        FooterModule,
        HomeModule,
      ],
      declarations: [AppComponent],
      providers: [
        ConfigService,
        LoggerService,
        DataService,
        EventService,
        ToastService,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
