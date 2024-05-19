import { Component, OnInit } from '@angular/core';
import { AlertSmsService } from 'src/app/service/alert-sms.service';
import { InvoiceService } from 'src/app/service/invoice.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceList: any
  constructor(
    private productService: ProductService,
    private alert: AlertSmsService,
    private invoiceService: InvoiceService
  ){}
  ngOnInit(): void {
    this.GetInvoice()
  }

  GetInvoice(){
    this.invoiceService.getInvoie().subscribe(res=>{
      
      if(res.status  ==="success"){
        this.invoiceList = res.invoice;
        console.log(this.invoiceList)
      }else{
        this.alert.alertSMS("0",res.status)
      }
    })
  }

}
