import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyspinnerService {
  busyRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rgba(255,255,255,0)',
      color: 'gray'
    })
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <=0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
