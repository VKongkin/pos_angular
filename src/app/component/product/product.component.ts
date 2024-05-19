import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertSmsService } from 'src/app/service/alert-sms.service';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{


  btnSave: boolean = false;
  btnUpdate: boolean = false;
  btnDelete: boolean = false;
  btnSaveSKU: boolean = false;
  btnUpdateSKU: boolean = false;
  btnDeleteSKU: boolean = false;
  skuId: boolean = false;
  btnSaveCate: boolean = false;
  btnUpdateCate: boolean = false;
  btnDeleteCate: boolean = false;
  cateId: boolean = false;
  productId: boolean = false;
  readonly: boolean = false;
  imagePath: any;
  file!: File;
  selectedFile: File | null = null;

  productForm = new FormGroup({
    productID: new FormControl(),
    productName: new FormControl(),
    description: new FormControl(),
    categoryID: new FormControl(),
    vendorID: new FormControl(),
    
    skuID: new FormControl(),
    unitPrice: new FormControl(),
    isActive: new FormControl(),
    imagePath: new FormControl(),
    imageFile: new FormControl(null)
  })

  skuForm = new FormGroup({
    skuID: new FormControl('0'),
    skuName: new FormControl(''),
    skuDescription: new FormControl('')
  })

  categoryForm = new FormGroup({
    categoryID: new FormControl('0'),
    categoryName: new FormControl(''),
    categoryDescription: new FormControl(''),
  })

  vendorForm = new FormGroup({
    vendorID : new FormControl(''),
    vendorName : new FormControl(''),
  })
  


  constructor(
    private productService: ProductService,
    private alert: AlertSmsService,
    private vendorService: VendorService
  ){}


  ProductList: any;
  SKUList: any;
  CategoryList: any;
  VendorList: any
 


  ngOnInit(): void {
    this.GetProduct();
    this.GetSKU();
    this.GetCategory();
    this.GetVendor();
  }

  Clear(){
    this.productForm = new FormGroup({
      productID: new FormControl('0'),
      productName: new FormControl(),
      description: new FormControl(),
      categoryID: new FormControl(''),
      vendorID: new FormControl(''),
      skuID: new FormControl(''),
      unitPrice: new FormControl('0'),
      isActive: new FormControl('1'),
      imagePath: new FormControl(''),
      imageFile: new FormControl(null)
    })
    this.imagePath="";
  }

  ClearSKU(){
    this.skuForm = new FormGroup({
      skuID: new FormControl('0'),
      skuName: new FormControl(''),
      skuDescription: new FormControl('')
    })
  }

  ClearCate(){
    this.categoryForm = new FormGroup({
      categoryID: new FormControl('0'),
      categoryName: new FormControl(''),
      categoryDescription: new FormControl(''),
    })
  }

  btnVisible(save: boolean, update: boolean, del: boolean){
    this.btnSave = save;
    this.btnUpdate = update;
    this.btnDelete = del;

    if(save === true){
      this.productId = false;
    }else{
      this.productId = true;
    }
  }
  
  btnSKU(save: boolean, update: boolean, del: boolean){
    this.btnSaveSKU = save;
    this.btnUpdateSKU = update;
    this.btnDeleteSKU = del;

    if(save === true){
      this.skuId = false;
    }else{
      this.skuId = true;
    }
  }

  btnCate(save: boolean, update: boolean, del: boolean){
    this.btnSaveCate = save;
    this.btnUpdateCate = update;
    this.btnDeleteCate = del;

    if(save === true){
      this.cateId = false;
    }else{
      this.cateId = true;
    }
  }

  AddNew(modal: string){
    if(modal === "product"){
      this.btnVisible(true,false,false);
      this.Clear();
      this.readonly = false;
    }else if(modal === "sku"){
      this.btnSKU(true,false,false);
      this.ClearSKU();
      this.readonly = false;
    }else if(modal === "cate"){
      this.btnCate(true,false,false);
      this.ClearCate();
      this.readonly = false;
    }

    
  }

  GetProduct(){
    this.productService.getProduct().subscribe(res=>{
      if(res.status === "success"){
        this.ProductList = res.product;
        console.log(this.ProductList)
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

  GetSkuById(SkuID:any, isUpdate:any){
    if(isUpdate === 1){
      this.btnSKU(false,true,false);
      this.readonly = false;
    }else{
      this.btnSKU(false,false,true);
      this.readonly = true;
    }
   
    let data ={
      skuID: SkuID
    };
    console.log(data)
    this.productService.getSkuById(data).subscribe(res=>{
      if(res.status === "success"){
        let sku: any = res.sku;

        this.skuForm = new FormGroup({
          skuID: new FormControl(sku.skuID),
          skuName: new FormControl(sku.skuName),
          skuDescription: new FormControl(sku.skuDescription)
        });
        console.log(this.skuForm.value)
      }
    })
  }

  GetCateById(CateID:any, isUpdate:any){
    if(isUpdate === 1){
      this.btnCate(false,true,false);
      this.readonly = false;
    }else{
      this.btnCate(false,false,true);
      this.readonly = true;
    }
   
    let data ={
      categoryID: CateID
    };
    console.log(data)
    this.productService.getCategoryById(data).subscribe(res=>{
      if(res.status === "success"){
        let category: any = res.category;

        this.categoryForm = new FormGroup({
          categoryID: new FormControl(category.categoryID),
          categoryName: new FormControl(category.categoryName),
          categoryDescription: new FormControl(category.categoryDescription),
        });
        console.log(this.categoryForm.value)
      }
    })
  }


  onCUDsku(operation: string) {
    // Set the cud property based on the operation
    let cud = '';
    if (operation === 'create') {
      cud = 'C';
    } else if (operation === 'update') {
      cud = 'U';
    } else if (operation === 'delete') {
      cud = 'D';
    }
  
    // Submit the form data along with the cud value
    this.productService.CUDSku(this.skuForm.value, cud).subscribe(
      async (res) => {
        if (res.status === "success") {
          this.GetSKU();
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

  onCUDCate(operation: string) {
    // Set the cud property based on the operation
    let cud = '';
    if (operation === 'create') {
      cud = 'C';
    } else if (operation === 'update') {
      cud = 'U';
    } else if (operation === 'delete') {
      cud = 'D';
    }
  
    // Submit the form data along with the cud value
    this.productService.CUDCategory(this.categoryForm.value, cud).subscribe(
      async (res) => {
        if (res.status === "success") {
          this.GetCategory();
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


  GetProductById(ProductId: any, isUpdate: any){
    if(isUpdate === 1){
      this.btnVisible(false,true,false);
      this.readonly = false;
    }else{
      this.btnVisible(false,false,true);
      this.readonly = true;
    }
   
    let data ={
      productID: ProductId
    };
    console.log(data)

    this.productService.getProductById(data).subscribe(res=>{
      if(res.status === "success"){
        let product: any = res.product;
        this.productForm = new FormGroup({
          productID: new FormControl(product.productID),
          productName: new FormControl(product.productName),
          description: new FormControl(product.description),
          categoryID: new FormControl(product.categoryID),
          vendorID: new FormControl(product.vendorID),
          skuID: new FormControl(product.skuID),
          unitPrice: new FormControl(product.unitPrice),
          isActive: new FormControl(product.isActive),
          imagePath: new FormControl("http://localhost:5186/Uploads/Product/"+product.imagePath),
          imageFile: new FormControl()
          // this.productForm.value.imagePath.target.file[0]
        });
        this.imagePath = this.productForm.value.imagePath;
        this.productForm.patchValue({
          imageFile: this.productForm.value.imagePath.target.files[0]
        })
      }
    })

  }

 


  onCUDproduct(operation: string) {
    // Set the cud property based on the operation
    let cud = '';
    if (operation === 'create') {
      cud = 'C';
    } else if (operation === 'update') {
      cud = 'U';
    } else if (operation === 'delete') {
      cud = 'D';
    }
  
    // Submit the form data along with the cud value
    this.productService.CUDProduct(this.productForm.value, cud).subscribe(
      async (res) => {
        if (res.status === "success") {
          this.GetProduct();
          this.alert.alertSMS("1", res.message);
          document.getElementById("btnClose")?.click();
        } else {
          this.alert.alertSMS("0", res.message);
        }
      },
      (err) => {
        this.alert.alertSMS("0", err);
      }
    );
  }

  onSaveProduct(){
    const formData = new FormData();
    formData.append('productID',this.productForm.get('productID')!.value);
    formData.append('productName',this.productForm.get('productName')!.value);
    formData.append('description',this.productForm.get('description')!.value);
    formData.append('categoryID',this.productForm.get('categoryID')!.value);
    formData.append('skuID',this.productForm.get('skuID')!.value);
    formData.append('qty',"0");
    formData.append('unitCost',"0");
    formData.append('unitPrice',this.productForm.get('unitPrice')!.value);
    formData.append('isActive',this.productForm.get('isActive')!.value);
    formData.append('vendorID',this.productForm.get('vendorID')!.value);
    formData.append('imageFile',this.productForm.get('imageFile')!.value!);
    console.log(formData)
    this.productService.addProductWithImg(formData).subscribe(res=>{
      if(res.status === "success"){
        console.log(res.status)
        this.alert.alertSMS("1",res.message);
        document.getElementById("btnClose")?.click
        this.GetProduct()
      }else{
        this.alert.alertSMS("0",res.message);
      }
    },
    (err=>{
      this.alert.alertSMS("0",err.message)
    })
    )
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
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.viewImage(this.selectedFile);
    console.log('File selected:', event.target.files?.[0]);
    this.productForm.get('imageFile')?.setValue(event.target.files?.[0]);
    console.log(this.productForm.value.imageFile)
    const file = event.target.files[0];
    this.productForm.patchValue({
      imageFile: event.target.files[0]
    });
  console.log(this.productForm.value.imageFile)

    // Update the image preview
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imageForm.patchValue({
    //     imagePath: reader.result as string
    //   });
    // };
    // console.log(this.imageForm.value.imagePath)
    // reader.readAsDataURL(file);


  }

  viewImage(file: any){
    let reader = new FileReader();
    this.file = file;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePath = reader.result;
    };
    console.log(this.imagePath)
  }

  getSKUName(skuID: number): string {
    const sku = this.SKUList.find((sku: any) => sku.skuID === skuID);
    return sku ? sku.skuName : 'N/A'; // Default to 'N/A' if SKU not found
  }

  getCateName(cateID: number): string {
    const category = this.CategoryList.find((category: any) => category.categoryID === cateID);
    return category ? category.categoryName : 'N/A'; // Default to 'N/A' if SKU not found
  }

  getVendorName(venodrID: number): string {
    const vendor = this.VendorList.find((vendor: any) => vendor.vendorID === venodrID);
    return vendor ? vendor.vendorName : 'N/A'; // Default to 'N/A' if SKU not found
  }

}

