import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertSmsService } from 'src/app/service/alert-sms.service';
import { ProductService } from 'src/app/service/product.service';
import { FormControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  categories: any[] = [];
  selectedCategory: string = '';
  selectedProduct: string = '';
  selectedProducts: any[] = [];
  invoiceItems: any[] = [];
  discount: number = 0;
  deposit: number = 0;
  invId: any;
  products: any;
  zoomFactor = 1.0;
  ProductList: any;

  invoiceHeadForm = new FormGroup({
    invoiceid: new FormControl('')
  })

  invoiceForm = new FormGroup({
    invoiceId: new FormControl(),
    invoiceNumber: new FormControl(''),
    invoiceDate: new FormControl(''),
    customerId: new FormControl(),
    invoiceAmount: new FormControl(0),
    invoiceDiscount: new FormControl(0),
    invoiceDeposit: new FormControl(0),
    invoiceBalance: new FormControl(),
  })

  customerForm = new FormGroup({
    customerId: new FormControl()
  })

  invoiceHandle: any = {
    invoiceId: 0,
    invoiceNumber: '',
    invoiceDate: '',
    customerId: 0,
    invoiceAmount: 0,
    invoiceDiscount: 0,
    invoiceDeposit: 0,
    invoiceBalance: 0,
    createBy: '1',
    createDate: '',
    lastUpdateBy: '',
    lastUpdateDate: '',
    invoiceItems: [{
      invoiceItemId: 0,
      invoiceId: 0,
      productId: 0,
      qty: 0,
      price: 0,
      amount: 0,
    }]
  }
  SKUList: any;
  balance: any;
  CategoryList: any;
  updatedQty: any;

constructor(
  private productService: ProductService,
  private alert: AlertSmsService,
  private invoiceService: InvoiceService,
  private formBuilder: FormBuilder
){}
  ngOnInit(): void {
    this.GetSKU()
    this.getCategories();
    this.removeAll();
    this.GetCategory();
    this.getInvID();

  }



  zoomIn() {
    this.zoomFactor += 0.1; // Adjust the step of zooming in
    this.applyZoom();
  }

  zoomOut() {
    this.zoomFactor -= 0.1; // Adjust the step of zooming out
    this.applyZoom();
  }

  applyZoom() {
    // Limit the zoom factor to a reasonable range, for example, between 1.0 and 3.0
    this.zoomFactor = Math.min(Math.max(this.zoomFactor, 1.0), 3.0);
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

  getCategories(){
    this.productService.getCategory().subscribe(res=>{
      if(res.status === "success"){
        this.categories = res.category;
        
      }
    },
    (err)=>{
      this.alert.alertSMS("0",err.message);
    }
    );
  }

  GetCategory(){
    this.productService.getCategory().subscribe(res=>{
      if(res.status === "success"){
        this.CategoryList = res.category;
        console.log(this.CategoryList)
      }
    },
    (err)=>{
      this.alert.alertSMS("0",err.message);
    }
    );
  }
  getTotalUniqueProductCount(): number {
    const uniqueProductIDs = new Set<number>();
  
    this.selectedProducts.forEach(product => {
      uniqueProductIDs.add(product.productId);
    });
  
    this.invoiceHandle.invoiceItems.forEach((item: { productId: number; }) => {
      uniqueProductIDs.add(item.productId);
    });
  
    return uniqueProductIDs.size;
  }
  
  calculateTotalAmount(item: any): number {
    const discountedAmount = item.price * item.qty * (1 - (item.discount / 100));
    this.invoiceForm.patchValue({
      invoiceAmount: this.calculateTotalSubtotal()
    }, { emitEvent: false });
    return discountedAmount;
  }
  
  calculateTotalSubtotal(): number {
    return this.invoiceHandle.invoiceItems.reduce((total: number, item: { qty: number; price: number; }) => total + (item.qty * item.price), 0);
  }

  calculateDiscount(subtotal: number): number {
    return (subtotal * this.discount) / 100;
  }

  // calculateBalance(subtotal: number): number {
  //   return subtotal - this.calculateDiscount(subtotal) - this.deposit;
  // }

  // calculateBalance(): void {
  //   // Get values from form controls
  //   const amount = this.invoiceForm.get('invoiceAmount')?.value || 0;
  //   const discount = this.invoiceForm.get('invoiceDiscount')?.value || 0;
  //   const deposit = this.invoiceForm.get('invoiceDeposit')?.value || 0;

  //   // Perform calculations
  //   const subtotal = amount - discount;
  //   const balance = subtotal - deposit;

  //   // Update form controls with calculated values
  //   this.invoiceForm.patchValue({
  //     invoiceAmount: amount,
  //     invoiceDiscount: discount,
  //     invoiceDeposit: deposit,
  //     invoiceBalance: balance
  //   });
  // }

  calculateBalance(): number {

    const amount = this.calculateTotalSubtotal();
    const discount =  this.invoiceForm.get('invoiceDiscount')?.value || 0;
    const deposit = this.invoiceForm.get('invoiceDeposit')?.value || 0;

    // console.log("amount:", amount);
    // console.log("calculateTotalSubtotal:", this.calculateTotalSubtotal());
    // console.log("deposit:", deposit);
    const discountper = (amount/100)*discount
    // Calculate balance after deducting deposit
    const balance = amount - deposit - discountper;

    // Update the value of invoiceBalance form control
    this.invoiceForm.patchValue({
      invoiceBalance: balance
    });

    return balance;
  }
  

  

  selectCategory(category: any) {
    this.selectedCategory = category;
    console.log(this.selectedCategory);

    let data = {
      categoryID: this.selectedCategory
    }
  
    this.productService.getProductsByCategory(data).subscribe(res => {
        console.log(res.status);
        if(res.status === "success"){
          this.products = res.products;


          console.log(this.invoiceForm.value.invoiceAmount)
        }else{
          this.products = null;
        }
      },
      (err) => {
        this.alert.alertSMS("0", err.message);        
      }
    );
  }

  updateQty(productId: number, change: number): void {
    const index = this.invoiceHandle.invoiceItems.findIndex((item: { productId: number; }) => item.productId === productId);
    this.updatedQty = productId;
    let data = {
      productID: this.updatedQty
    }
    if (index !== -1) {
      this.productService.getProductById(data).subscribe(res =>{
        console.log(res.product.qty)
        if(res.product.qty <= this.invoiceHandle.invoiceItems[index].qty){
          
          
          if(change === 1 ){
            this.alert.alertSMS("0", "Can not add more quantity!" );  
          }else if(change === -1){
          if (this.invoiceHandle.invoiceItems[index].qty + change >= 0) {
            this.invoiceHandle.invoiceItems[index].qty += change;
          }
          console.log("test",this.invoiceForm.value.invoiceAmount)
          }
        }else{
          if (this.invoiceHandle.invoiceItems[index].qty + change >= 0) {
            this.invoiceHandle.invoiceItems[index].qty += change;
          }
          // this.invoiceForm.value.invoiceAmount = this.calculateTotalSubtotal()
          this.invoiceForm.patchValue({
            invoiceAmount: this.calculateTotalSubtotal()
          }, { emitEvent: false });
          console.log("test",this.invoiceForm.value.invoiceAmount)
        }
      })
      // Ensure the quantity doesn't go below 0

    }
  }
  
  selectProduct(productid: any){
    this.selectedProduct = productid;
    let data = {
      productID: this.selectedProduct
    }
    const existingProductIndex = this.invoiceHandle.invoiceItems.findIndex((product: { productId: any; }) => product.productId === productid);
    
    if (existingProductIndex !== -1) {
      this.productService.getProductById(data).subscribe(res =>{
        console.log(res.product)
        console.log(res.product.qty)
        if(res.product.qty <= this.invoiceHandle.invoiceItems[existingProductIndex].qty){
          
          this.alert.alertSMS("0", "Can not add more quantity!" );  
        }else{
          this.invoiceHandle.invoiceItems[existingProductIndex].qty += 1;
          this.invoiceForm.patchValue({
            invoiceAmount: this.calculateTotalSubtotal()
          }, { emitEvent: false });
        }
      })
      // If the product with the same ID exists, update quantity and replace price
      
      
    } else{
    this.productService.getProductById(data).subscribe(res =>{
      console.log(res.product)
      
      if(res.status === "success" && res.product.qty > 0){
        this.ProductList = res.product;
        let obj = {
          invoiceItemId: 0,
          invoiceId: 0,
          productId: this.ProductList.productID,
          qty: 1,
          discount: 0,
          skuID: this.ProductList.skuID,
          name: this.ProductList.productName,
          price: this.ProductList.unitPrice,
          amount: this.ProductList.unitPrice * 1
        };
        this.invoiceHandle.invoiceItems.push(obj);
        this.invoiceForm.patchValue({
          invoiceAmount: this.calculateTotalSubtotal()
        }, { emitEvent: false });
        console.log(this.invoiceHandle)
      }else{
        this.ProductList = null;
        this.alert.alertSMS("0", "Can not select this product!"); 
      }
    },
    (err) => {
      this.alert.alertSMS("0", err.message);        
    });
  }
  }

  removeAll(){
    this.invoiceHandle.invoiceItems.splice(0, this.invoiceHandle.invoiceItems.length)
  }

  removeItem(vid: number, vname: any){
    console.log(this.invoiceHandle)
      // Assuming this.productList is an array of objects with proID property
      // this.productList = this.productList.filter((item: { proID: any; }) => item.proID !== vid);
      let i = this.invoiceHandle.invoiceItems.findIndex((x: {productID: number; })=> x.productID ===vid);
      this.invoiceHandle.invoiceItems.splice(i,1);
      console.log(this.invoiceHandle);
      this.updateTotalAmount();

  }

  totalAmount: number = 0;
  productList: any = [];
  updateTotalAmount() {
    // this.productForm.get('poAmount')?.setValue(
    // this.totalAmount = this.poHandle.details.reduce((total: number, item: { qty: number; price: number; }) => total + item.qty * item.price, 0));
  }
getInvID(){
  this.invoiceService.getInvoieId().subscribe(res=>{
    console.log(res.invoiceId)
    if(res.status === "success"){
      this.invId = res.invoiceId;
      this.invoiceHeadForm = new FormGroup({
        
        invoiceid: new FormControl(this.invId.invoiceId)
      })
      
      console.log(this.invId.invoiceId)

    }
    })

}

onSaveOrder() {
  this.invoiceService.getInvoieId().subscribe(res => {
    this.invId = res.invoiceId;

    // Code that depends on this.invId should be inside this block
    this.invoiceHandle = {
      invoiceId: 0,
      invoiceNumber: this.invId.invoiceId,
      invoiceDate: new Date(),
      customerId: this.customerForm.value.customerId,
      invoiceAmount: 0,
      invoiceDiscount: this.invoiceForm.value.invoiceDiscount,
      invoiceDeposit: this.invoiceForm.value.invoiceDeposit,
      invoiceBalance: this.invoiceForm.value.invoiceBalance,
      createBy: '1',
      createDate: new Date(),
      lastUpdateBy: '1',
      lastUpdateDate: new Date(),
      invoiceItems: this.invoiceHandle.invoiceItems
    };

    // Now that invoiceHandle is properly set, you can proceed with further operations
    console.log(this.invoiceHandle);

    this.invoiceService.createInvoice(this.invoiceHandle).subscribe(res => {
      if (res.status === "Success") {
        this.updateProduct();
        this.ngOnInit();
        this.selectCategory(0)
        //document.getElementById("btnReset")?.click();

        this.alert.alertSMS("1", res.message);
      } else {
        this.alert.alertSMS("0", res.message);
      }
    }, (err) => {
      this.alert.alertSMS("0", err.message);
    });
  }, (err) => {
    console.error("Error fetching invoice ID:", err);
    // Handle error if needed
  });
}


  updateProduct(){
    let data = {
      "productID": 8,
      "productName": "string",
      "description": "string",
      "categoryID": 0,
      "skuID": 0,
      "qty": 10,
      "unitCost": 0,
      "unitPrice": 0,
      "isActive": 0,
      "vendorID": 0,
      "imagePath": "string"
    }
    console.log(this.invoiceHandle.invoiceItems)
    this.invoiceService.updateProduct(this.invoiceHandle.invoiceItems).subscribe(res=>{
      console.log(res.status)
      if(res.status === "success"){
        this.alert.alertSMS("1" ,res.message)
      }
    })
  }

  getSKUName(skuID: number): string {
    const sku = this.SKUList.find((sku: any) => sku.skuID === skuID);
    return sku ? sku.skuName : 'N/A'; // Default to 'N/A' if SKU not found
  }

  getCateName(cateID: number): string {
    const category = this.CategoryList.find((category: any) => category.categoryID === cateID);
    return category ? category.categoryName : 'N/A'; // Default to 'N/A' if SKU not found
  }

}
