import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ToastService } from './services/toast.service';
import { Constants } from './shared/utils/constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'attendance-and-revanue-admin';
  toastSubscription: Subscription;
  showSideBar = false;
  showBreadCrumb = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private toastService: ToastService
  ) {
    this.watchForToast();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.activatedRoute && this.activatedRoute.firstChild) {
          const routeData = this.activatedRoute.firstChild.snapshot.data;
          this.showSideBar = routeData['showSideBar'] !== false;
          this.showBreadCrumb = routeData['showBreadCrumb'] !== false;
        }
      }
    });
  }

  private watchForToast() {
    // tslint:disable-next-statement
    const self = this;
    this.toastSubscription = this.toastService.messages.subscribe(
      (messages) => {
        messages.forEach((msg) => {
          switch (msg.type) {
            case Constants.ToastTypes.SUCCESS:
              {
                this.toastr.success(msg.body, msg.title);
              }
              break;
            case Constants.ToastTypes.WARNING:
              {
                this.toastr.warning(msg.body, msg.title);
              }
              break;
            case Constants.ToastTypes.INFO:
              {
                this.toastr.info(msg.body, msg.title);
              }
              break;
            case Constants.ToastTypes.ERROR:
              {
                this.toastr.error(msg.body, msg.title, {
                  extendedTimeOut: 0,
                  timeOut: 0,
                  closeButton: true,
                });
              }
              break;
          }
          // Remove message from memory
          self.toastService.removeMessage(msg.guid);
        });
      }
    );
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
  }
}
