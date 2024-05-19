import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertSmsService {

  constructor(private toastr: ToastrService) { }

  alertSMS(isSuccess: any, message: any){
    if(isSuccess === "1"){
      this.toastr.success(message, 'Information', {
        positionClass: 'toast-top-right'
      });
    }else{
      this.toastr.error(message, 'Information', {
        positionClass: 'toast-top-right'
      });
    }
  }
}
