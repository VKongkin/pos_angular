import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertSmsService } from 'src/app/service/alert-sms.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  btnSave: boolean = false;
  btnUpdate: boolean = false;
  btnDelete: boolean = false;
  vendorId: boolean = false;

  vendorForm = new FormGroup({
    vendorID : new FormControl('0'),
    vendorName : new FormControl(''),
    vendorDescription : new FormControl(''),
    vendorPhone : new FormControl(''),
    vendorEmail : new FormControl(''),
    vendorAddress : new FormControl(''),
    isActive : new FormControl('1'),
  })

  constructor(
    private vendorService: VendorService,
    private alert: AlertSmsService
  ){}

  VendorList: any;
  btnVendor(save: boolean, update: boolean, del: boolean){
    this.btnSave = save;
    this.btnUpdate = update;
    this.btnDelete = del;

    // if(save === true){
    //   this.vendorId = false;
    // }else{
    //   this.vendorId = true;
    // }
  }

  Clear(){
    this.vendorForm = new FormGroup({
      vendorID : new FormControl('0'),
      vendorName : new FormControl(''),
      vendorDescription : new FormControl(''),
      vendorPhone : new FormControl(''),
      vendorEmail : new FormControl(''),
      vendorAddress : new FormControl(''),
      isActive : new FormControl('1'),
    })
}


  ngOnInit(): void {
    this.GetVenodr();
  }
  AddNew(modal: string){
    if(modal === "vendor"){
      this.btnVendor(true,false,false);
      this.Clear();
      // this.readonly = false;
    }
    // else if(modal === "sku"){
    //   this.btnSKU(true,false,false);
    //   this.ClearSKU();
    //   this.readonly = false;
    // }else if(modal === "cate"){
    //   this.btnCate(true,false,false);
    //   this.ClearCate();
    //   this.readonly = false;
    // }

    
  }

    GetVenodr(){
    this.vendorService.getVendor().subscribe(res=>{
      if(res.status === "success"){
        this.VendorList = res.vendor;
        console.log(this.VendorList)
      }
    },
    (err)=>{
      this.alert.alertSMS("0",err.message);
    }
    );
  }

  GetVendorById(VendorID:any, isUpdate:any){
    if(isUpdate === 1){
      this.btnVendor(false,true,false);
      // this.readonly = false;
    }else{
      this.btnVendor(false,false,true);
      // this.readonly = true;
    }
   
    let data ={
      vendorID: VendorID
    };
    console.log(data)
    this.vendorService.getVendorById(data).subscribe(res=>{
      if(res.status === "success"){
        let vendor: any = res.vendor;

        this.vendorForm = new FormGroup({
          vendorID : new FormControl(vendor.vendorID),
          vendorName : new FormControl(vendor.vendorName),
          vendorDescription : new FormControl(vendor.vendorDescription),
          vendorPhone : new FormControl(vendor.vendorPhone),
          vendorEmail : new FormControl(vendor.vendorEmail),
          vendorAddress : new FormControl(vendor.vendorAddress),
          isActive : new FormControl(vendor.isActive),
        })
        console.log(this.vendorForm.value)
      }
    })
  }


  onCUDVendor(operation: string) {
    // Set the cud property based on the operation
    let cud = '';
    if (operation === 'create') {
      cud = 'C';
    } else if (operation === 'update') {
      cud = 'U';
    } else if (operation === 'delete') {
      cud = 'D';
    }
  
    //Submit the form data along with the cud value
    this.vendorService.CUDVendor(this.vendorForm.value, cud).subscribe(
      async (res) => {
        if (res.status === "success") {
          this.GetVenodr();
          this.alert.alertSMS("1", res.message);
        } else {
          this.alert.alertSMS("0", res.message);
        }
      },
      (err) => {
        this.alert.alertSMS("0", err);
      }
    );
  }



}
