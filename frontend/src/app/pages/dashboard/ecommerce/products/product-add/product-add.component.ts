import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialog} from '@angular/material/dialog';
import {NewItemDlgComponent} from '../new-item-dlg/new-item-dlg.component';
import {UtilService} from '@app/_services/util.service';
import {ToastService} from '@app/_services/toast.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '@app/_services/auth.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit, OnDestroy {
  private user: any;
  private image: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  action = 'add';
  productForm: FormGroup;
  tags = [];
  selectedType: any;
  types = [];
  selectedBrand: any;
  brands = [];
  trackingInv = false;
  variants = [{attribute: '', value: []}];
  attributes = [];
  selectedSupplier: any;
  suppliers = [];
  submitted = false;
  variantInv = false;
  sku: any;
  variantProducts = [];
  sticky: boolean;
  inventory = 0;
  reorderPoint = 0;
  reorderAmount = 0;
  taxes = [];
  tax: any;
  supplyPrice = 0;
  markup = 0;
  retailPrice: number;
  enabled: boolean;
  product: any = {};
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private utilService: UtilService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: ActivatedRoute,
    private location: Location,
  ) {
    this.router.queryParams.subscribe(query => {
      if (query && query.action) {
        this.action = query.action;
        if (query.action === 'edit') {
          this.product.id = query._id;
        }
      }
    });
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      handle: ['', Validators.required],
      description: [''],
      supplier_code: ['', Validators.required],
    });

    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
    this.initProperty();
  }

  initProperty(): void {
    if (this.action === 'edit') {
      const data = {range: '_id', user_id: this.user._id, store_name: this.user.store_name, _id: this.product.id};
      this.utilService.get('product/product', data).subscribe(result => {
        console.log('products ...', result);
        this.product = result.body;
        this.productForm.get('description').setValue(this.product.description);
        this.productForm.get('name').setValue(this.product.name);
        this.productForm.get('supplier_code').setValue(this.product.supplier_code);
        this.productForm.get('handle').setValue(this.product.handle);
        this.selectedBrand = this.product.brand;
        this.selectedType = this.product.type;
        this.reorderPoint = this.product.reorder_point;
        this.retailPrice = this.product.retail_price;
        this.sku = this.product.sku;
        this.variantInv = this.product.variant_inv;
        this.variantProducts = this.product.variant_products;
        this.variants = this.product.variants;
        this.supplyPrice = this.product.supply_price;
        this.tags = this.product.tag;
        this.tax = this.product.tax;
        this.trackingInv = this.product.tracking_inv;
        this.selectedSupplier = this.product.supplier;
        this.enabled = this.product.enabled;
        this.image = this.product.image;
        this.inventory = this.product.inventory;
        this.markup = this.product.markup;
        this.reorderAmount = this.product.reorder_amount;
      });
    }
    this.utilService.get('util/crud', {user_id: this.user._id, store_name: this.user.store_name, tbl: 'brand'}).subscribe(result => {
      this.brands = result.body.map(item => item.name);
    });
    this.utilService.get('util/crud', {user_id: this.user._id, store_name: this.user.store_name, tbl: 'type'}).subscribe(result => {
      this.types = result.body.map(item => item.name);
    });
    // this.utilService.get('util/crud', {user_id: this.user._id, store_name: this.user.store_name, tbl: 'tag'}).subscribe(result => {
    //   this.tags = result.body.map(item => item.name);
    // });
    this.utilService.get('util/crud', {user_id: this.user._id, store_name: this.user.store_name, tbl: 'attribute'}).subscribe(result => {
      this.attributes = result.body.map(item => item.name);
    });
    this.utilService.get('util/crud', {user_id: this.user._id, store_name: this.user.store_name, tbl: 'supplier'}).subscribe(result => {
      this.suppliers = result.body.map(item => item.name);
    });
  }

  scroll = (event: any): void => {
    const num = event.srcElement.scrollTop;
    this.sticky = num > 64;
  }


  removeTag(tag: any): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim() && !this.tags.includes(value)) {
      this.tags.push(value.trim());
      const data = {name: value.trim(), user_id: this.user._id, store_name: this.user.store_name};
      this.utilService.post('product/tag', data).subscribe();
    }
    if (input) {
      input.value = '';
    }
  }

  addItem(item): void {
    let url = '';
    if (this.selectedType !== 'newType' && this.selectedBrand !== 'newBrand' && this.selectedSupplier !== 'newSupplier') {
      return;
    }
    if (this.selectedBrand) {
      this.selectedBrand = '';
      url = 'product/brand';
    }
    if (this.selectedType) {
      this.selectedType = '';
      url = 'product/type';
    }
    if (this.selectedSupplier) {
      this.selectedSupplier = '';
      url = 'product/supplier';
    }
    this.handleAddItem(item, url);
  }

  handleAddItem(item, url): void {
    const dialogRef = this.dialog.open(NewItemDlgComponent, {
      width: '600px',
      height: '300px',
      data: {item, value: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.value) {
        const data = {name: result.value, user_id: this.user._id, store_name: this.user.store_name};
        this.utilService.post(url, data).subscribe(response => {
          if (item === 'Type') {
            this.types.push(result.value);
          } else if (item === 'Brand') {
            this.brands.push(result.value);
          } else if (item === 'Supplier') {
            this.suppliers.push(result.value);
          } else if (item === 'Attribute') {
            this.attributes.push(result.value);
          }
          if (response.body.status) {
            this.toastService.showSuccess(result.item + ' - ' + result.value + ' already existed', 'Add ' + result.item);
          } else {
            this.toastService.showSuccess('New ' + result.item + ' - ' + result.value + ' added successfully', 'Add ' + result.item);
          }
        }, error => {
          this.toastService.showFailed('Failed to add ' + result.value, 'Add ' + result.item);
        });
      }
    });
  }

  uploadFile(files: any, index): void {
    const file = files[0];
    if (!file.type.includes('image')) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    this.utilService.post('product/file', formData).subscribe(result => {
      if (index < 0) {
        this.image = result.body.filename;
      } else {
        this.variantProducts[index].image = result.body.filename;
      }
      this.toastService.showSuccess('Image uploaded successfully', 'Image upload');
    }, error => {
      this.toastService.showFailed('Failed to upload image', 'Image upload');
    });
  }

  newVariant(): void {
    this.variants.push({attribute: '', value: []});
  }
  removeVariant(attrIndex): void {
    this.variants.splice(attrIndex, 1);
    this.genVariantProducts();
  }

  setPrice(element: string): void {
    if (element === 'retail') {
      this.retailPrice = parseFloat(this.retailPrice.toFixed(2));
      const retailPrice = this.retailPrice;
      const supplyPrice =  this.supplyPrice;
      this.markup = supplyPrice ? 100 * (retailPrice - supplyPrice) / supplyPrice : this.markup;
      this.markup = parseFloat(this.markup.toFixed(2));
    } else if (element === 'supply') {
      this.supplyPrice = parseFloat(this.supplyPrice.toFixed(2));
      this.retailPrice = parseFloat((this.supplyPrice * (1 + this.markup / 100)).toFixed(2));
    } else {
      this.markup = parseFloat(this.markup.toFixed(2));
      this.retailPrice = parseFloat((this.supplyPrice * (1 + this.markup / 100)).toFixed(2)) ;
    }
  }

  addAttrValue(event: MatChipInputEvent, attrIndex): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.variants[attrIndex].value.push(value.trim());
    }
    this.genVariantProducts();
    if (input) {
      input.value = '';
    }
  }

  removeAttrValue(value, attrIndex): void {
    const index = this.variants[attrIndex].value.indexOf(value);
    if (index > 0) {
      this.variants[attrIndex].value.splice(index, 1);
    }
  }

  addAttribute(attrIndex: number): void {
    if (this.variants[attrIndex].attribute === 'newAttribute') {
      this.variants[attrIndex].attribute = '';
      this.handleAddItem('Attribute', 'product/attribute');
    } else {
      this.genVariantProducts();
    }
  }
  editAttrValue(): void {

  }

  genVariantProducts(): void {
    this.variantProducts = [];
    const variants = this.variants.filter(variant => variant.attribute && variant.value.length);
    const varLen = variants.length;
    if (varLen > 0) {
      variants[0].value.forEach(a => {
        if (varLen === 1) {
          this.handleVariant(a);
        }
        if (varLen > 1 ) {
          variants[1].value.forEach(b => {
            if (varLen === 2) {
              this.handleVariant(a, b);
            }
            if (varLen === 3) {
              variants[2].value.forEach(c => {
                if (varLen === 3) {
                  this.handleVariant(a, b, c);
                }
              });
            }
          });
        }
      });
    }
  }

  handleVariant(a = '', b = '', c = ''): void {
    let product = {};
    const supplyPrice = this.supplyPrice;
    const retailPrice = this.retailPrice;
    const markup = this.markup;
    const name = c ? a + '/' + b + '/' + c : (b ?  a + '/' + b : a);
    if (this.trackingInv) {
      product = {
        name, sku: '', supplier_code: '', supply_price: supplyPrice, retail_price: retailPrice, markup, enabled: true, tax: '', image: '',
        inventory: 0, reorder_point: 0, reorder_amount: 0
      };
    } else {
      product = { name, sku: '', supplier_code: '', supply_price: supplyPrice,
        retail_price: retailPrice,  markup, enabled: true, tax: '', image: '' };
    }
    this.variantProducts.push(product);
  }

  goBack(): void {
    this.location.back();
  }

  submit(): void {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    if (!this.variantInv) {
      this.productForm.value.sku = this.sku;
    }
    if (this.trackingInv && !this.variantInv) {
      this.productForm.value.inventory = this.inventory;
      this.productForm.value.reorder_amount = this.reorderAmount;
      this.productForm.value.reorder_point = this.reorderPoint;
    }
    if (this.variantInv && this.variantProducts.length) {
      this.productForm.value.variant_products = this.variantProducts;
    }
    this.productForm.value.user_id = this.user._id;
    this.productForm.value.store_name = this.user.store_name;
    this.productForm.value.brand = this.selectedBrand;
    this.productForm.value.tag = this.tags;
    this.productForm.value.type = this.selectedType;
    this.productForm.value.image = this.image;
    this.productForm.value.enabled = this.enabled;
    this.productForm.value.supply_price = this.supplyPrice;
    this.productForm.value.markup = this.markup;
    this.productForm.value.retail_price = this.retailPrice;
    this.productForm.value.supplier = this.selectedSupplier;
    this.productForm.value.tax  = this.tax;
    this.productForm.value.tracking_inv = this.trackingInv;
    this.productForm.value.variant_inv = this.variantInv;
    this.productForm.value.variants = this.variants;
    if (this.action === 'add') {
      this.utilService.post('util/crud', {tbl: 'product', data: this.productForm.value})
        .subscribe(result => {
          this.goBack();
          this.toastService.showSuccess('New product created successfully', 'Add product');
        }, error => {
          this.toastService.showFailed('Failed to add new product', 'Add product');
        });
    } else if (this.action === 'edit') {
      this.utilService.put('product/product', {field: 'all', id: this.product._id, value: this.productForm.value})
        .subscribe(result => {
          this.goBack();
          this.toastService.showSuccess('New product created successfully', 'Add product');
        }, error => {
          this.toastService.showFailed('Failed to add new product', 'Add product');
        });
    }
  }

  toUppercase(action: any): string {
    return action.slice(0, 1).toUpperCase() + action.slice(1, action.length);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
