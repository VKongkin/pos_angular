interface ProductSelection {
  id: number;
  name: string;
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertSmsService } from 'src/app/service/alert-sms.service';
import { POService } from 'src/app/service/p-o.service';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  proList: any;
  proObj: any;
  POList: any;
  btnSave: boolean = false;
  btnUpdate: boolean = false;
  btnDelete: boolean = false;

  btnPO(save: boolean, update: boolean, del: boolean){
    this.btnSave = save;
    this.btnUpdate = update;
    this.btnDelete = del;

    // if(save === true){
    //   this.vendorId = false;
    // }else{
    //   this.vendorId = true;
    // }
  }
  poHandle: any = {
    poId: 0,
    poDate: new Date(),
    vendorId: '',
    userId: 1,
    reference: '',
    poAmount: '',
    details: [{
      poDetailID: 0,
      poId: 0,
      productId: 0,
      qty: 0,
      unitCost: 0,
      amount: 0,
    }],
    products: [{
      productID: 0,
      productName: '',
      description: '',
      categoryID: 0,
      skuID: 0,
      qty: 0,
      unitCost: 0,
      unitPrice: 0,
      isActive: 0,
      vendorID: 0,
    }],
  }

  proForm = new FormGroup({
    dtId: new FormControl(''),
    Qty: new FormControl(''),
    sku: new FormControl(''),
    unitCost: new FormControl('')
  })
  currentDate = new Date;
  productForm = new FormGroup({
    poId: new FormControl(0),
    poDate: new FormControl(),
    vendorId: new FormControl(''),
    userId: new FormControl(0),
    reference: new FormControl(''),
    poAmount: new FormControl('0'),
    details: new FormArray([])
  })
  
  ProductList: any;
  VendorList: any;
  public countriesReactive: any;
  SKUList: any;

  constructor(
    private productService: ProductService,
    private alert: AlertSmsService,
    private fb: FormBuilder,
    private poService: POService,
    private vendorService: VendorService,
    private _fb: FormBuilder
    ) {
      this.reactiveForm = _fb.group({
        name: [{value: '', disabled: false}, Validators.required]
      });
    }

    AddNew(){
      this.ClearAll(),
      this.btnPO(true,false,false);
    }
    Clear(){
      this.proForm = new FormGroup({
        dtId: new FormControl(''),
        Qty: new FormControl(''),
        sku: new FormControl(''),
        unitCost: new FormControl('')
      })

    }
    ClearAll(){
      this.productForm = new FormGroup({
        poId: new FormControl(0),
        poDate: new FormControl('0'),
        vendorId: new FormControl(''),
        userId: new FormControl(0),
        reference: new FormControl(''),
        poAmount: new FormControl('0'),
        details: new FormArray([])
      }),
      this.remAllProduct();
    }

    AddProduct() {
      this.proObj = this.proForm.value.dtId;
      console.log(this.proForm.value.Qty)
    if(this.proForm.value.Qty === "" || this.proForm.value.unitCost === ""){
      this.alert.alertSMS(0,"Product field cannot be blank!")
    }else{
      // Check if a product with the same ID already exists in the productList
      const existingProductIndex = this.poHandle.details.findIndex((product: { productId: any; }) => product.productId === this.proObj.id);
    
      if (existingProductIndex !== -1) {
        // If the product with the same ID exists, update quantity and replace price
        this.poHandle.details[existingProductIndex].qty += this.proForm.value.Qty;
        this.poHandle.details[existingProductIndex].unitCost = this.proForm.value.unitCost;
      } else {
        // If the product with the same ID doesn't exist, add a new product
        let obj = {
          productId: this.proObj.id,
          proName: this.proObj.name,
          qty: this.proForm.value.Qty,
          sku: this.proObj.skuID,
          unitCost: this.proForm.value.unitCost,
          amount: 0,
        };
        this.poHandle.details.push(obj);
        // (this.productForm.get('details') as FormArray).push(this.poHandle.details);
        // console.log(this.productForm.value)
        //this.productList.push(obj);
      }
    
      this.Clear();
      console.log(this.proObj.skuID);
      this.updateTotalAmount();

    }
    }
    


    updateSelectedProduct(){
      this.proObj = this.proForm.value.dtId;
      console.log(this.proForm.value.Qty)
    if(this.proForm.value.Qty === "" || this.proForm.value.unitCost === ""){
      this.alert.alertSMS(0,"Product field cannot be blank!")
    }else{
    
      // Check if a product with the same ID already exists in the productList
      const existingProductIndex = this.poHandle.details.findIndex((product: { productId: any; }) => product.productId === this.proObj.id);
    
      if (existingProductIndex !== -1) {
        // If the product with the same ID exists, update quantity and replace price
        this.poHandle.details[existingProductIndex].qty = this.proForm.value.Qty;
        this.poHandle.details[existingProductIndex].unitCost = this.proForm.value.unitCost;
      } else {
        this.alert.alertSMS(0,"Product list does not exist!")
      }
    
      this.Clear();
      console.log(this.proObj.skuID);
      this.updateTotalAmount();
    }
    }

    
    onCUDpo(operation: string) {
      // Set the cud property based on the operation
      let cud = '';
      if (operation === 'create') {
        cud = 'C';
      } else if (operation === 'update') {
        cud = 'U';
      } else if (operation === 'delete') {
        cud = 'D';
      }
      console.log(this.proForm.value)
      //Submit the form data along with the cud value
      this.poService.CUDpo(this.proForm.value, cud).subscribe(
        async (res) => {
          if (res.status === "success") {
            this.GetPO();
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
          
    
    GetPO(){
      this.poService.getPODetail().subscribe(res=>{
        if(res.status === "success"){
          this.POList = res.poDetail;
          console.log(this.POList)
        }
      },
      (err)=>{
        this.alert.alertSMS("0",err.message);
      }
      );
    }

    GetPOById(PoID:any, isUpdate:any){
      if(isUpdate === 1){
        this.btnPO(false,true,false);
        // this.readonly = false;
      }else{
        this.btnPO(false,false,true);
        // this.readonly = true;
      }
     
      let data ={
        poId: PoID
      };
      console.log(data)
      this.poService.getPOById(data).subscribe(res=>{
        if(res.status === "success"){
          let po: any = res;
  
          this.productForm = new FormGroup({
            poId: new FormControl(po.PoId),
            poDate: new FormControl(po.poDate),
            vendorId: new FormControl(po.vendorId),
            userId: new FormControl(po.userId),
            reference: new FormControl(po.reference),
            poAmount: new FormControl(po.poAmount),
            details: new FormArray([])
          })
          console.log(this.productForm.value)
        }
      })
    }


    onSavePO(){
      this.poHandle = {
        poId: 0,
        poDate: new Date,
        vendorId: this.productForm.value.vendorId,
        userId: 1,
        reference: this.productForm.value.reference,
        poAmount: this.productForm.value.poAmount,
        details: this.poHandle.details,
        
      }
      console.log(this.poHandle.details)
      if(this.productForm.value.poAmount === "0"){
        this.alert.alertSMS("0", "Cannot save blank data!")
      }else{
        this.poService.addNewPO(this.poHandle).subscribe(res =>{
          console.log(this.poHandle)
          console.log(res.status);
          if(res.status === "Success"){
            this.updateProduct()
            this.GetPO();
            document.getElementById("btnClose")?.click();
            this.remAllProduct();
            this.ClearAll(),
            this.Clear()
            this.alert.alertSMS("1", res.message);
          }else{
            this.alert.alertSMS("0", res.message);
          }
        });

      }

    }

    updateProduct(){

      this.poService.updateProduct(this.poHandle.details).subscribe(res=>{
        
        console.log(res.status)
        if(res.status==="success"){
          this.alert.alertSMS("1",res.message)
        }
      },
      (err=>{
        this.alert.alertSMS("0",err.message)
      })
      );
    }

    remProduct(vid: number, vanme: any) {
      // Assuming this.productList is an array of objects with proID property
      // this.productList = this.productList.filter((item: { proID: any; }) => item.proID !== vid);
      let i = this.poHandle.details.findIndex((x: {productId: number; })=> x.productId ===vid);
      this.poHandle.details.splice(i,1);
      console.log(this.productList);
      this.updateTotalAmount();
    }
    
    remAllProduct(){
      this.poHandle.details.splice(0, this.poHandle.details.length);
    }


    totalAmount: number = 0;
    productList: any = [];
    updateTotalAmount() {
      this.productForm.get('poAmount')?.setValue(
      this.totalAmount = this.poHandle.details.reduce((total: number, item: { qty: number; unitCost: number; }) => total + item.qty * item.unitCost, 0));
    }

  GetProductArr(){
    this.productService.getProductArr().subscribe(res=>{
      if(res.status === "success"){
        this.proList = res.product;
        this.countriesReactive = res.product;
        console.log(this.proList);
        
      }
    },
    (err)=>{
      this.alert.alertSMS("0",err.message);
    }
    );
  }

  GetVendor(){
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

  GetSKU(){
    this.productService.getSKU().subscribe(res=>{
      if(res.status === "success"){
        this.SKUList = res.sku;
        console.log(this.SKUList)
      }
    },
    (err)=>{
      this.alert.alertSMS("0",err.message);
    }
    );
  }

  name = '';
  /**
   * Form
   */
  reactiveForm: FormGroup;


  public placeholder: string = 'Enter the Country Name';
  public keyword = 'name';
  public historyHeading: string = 'Recently selected';

  public countriesTemplate = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus',
    'Belgium', 'Bosnia & Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus',
    'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia',
    'Germany', 'Greece', 'Hungary', 'Iceland', 'India', 'Ireland', 'Italy', 'Kosovo',
    'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta',
    'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'Norway', 'Poland',
    'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia',
    'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'];



  ngOnInit() {
    this.GetProductArr();
    this.GetVendor();
    this.GetSKU();
    // this.Load();
    this.setToCurrentDatetime(),
    this.GetPO()
  }
  
  setToCurrentDatetime() {
    this.productForm.patchValue({ poDate: new Date().toISOString().substring(0, 16) });
  }
  count(skuID: any){
    this.proObj = this.proForm.value.dtId;
    console.log(skuID)
    this.proForm = new FormGroup({
      dtId: new FormControl(''),
      Qty: new FormControl(''),
      sku: new FormControl(this.getSKUName(skuID)),
      unitCost: new FormControl('')
    })
  }

  check(){
    console.log("Hi");
  }
  change(){
    console.log("change")
  }
  focus() {
    if (this.proForm.value.dtId === "") {
      this.proForm.patchValue({ sku: "" });
      console.log(this.proForm.value.sku);
    }
  }
  onChangeSearch(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim() === "") {
      this.proForm.patchValue({ sku: "" });
    }
    // Other logic related to search change...
  }

  isFocused: boolean = false;
  onFocused(focused: boolean): void {
    this.isFocused = focused;

    // If not focused, check for empty search term
    if (!focused) {
      const searchTerm = this.proForm.value.dtId;
      if (!searchTerm || searchTerm.trim() === "") {
        this.proForm.patchValue({ sku: null });
      }
    }

    // Other logic related to focus change...
  }

    /**
   * Submit template form
   */
  submitTemplateForm(value: any) {
    console.log(value);
  }

  /**
   * Submit reactive form
   */
  submitReactiveForm() {
    if (this.reactiveForm.valid) {
      console.log(this.reactiveForm.value);
    }
  }
  
  getSKUName(skuID: number): string {
    const sku = this.SKUList.find((sku: any) => sku.skuID === skuID);
    return sku ? sku.skuName : 'N/A'; // Default to 'N/A' if SKU not found
  }

  getVendorName(venodrID: number): string {
    const vendor = this.VendorList.find((vendor: any) => vendor.vendorID === venodrID);
    return vendor ? vendor.vendorName : 'N/A'; // Default to 'N/A' if SKU not found
  }

}
function indexOf(obj: { proID: any; proName: any; }): any {
  throw new Error('Function not implemented.');
}

