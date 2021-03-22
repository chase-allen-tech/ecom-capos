import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilService} from '../../../../../_services/util.service';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any = {};
  variants = [];
  private apiUrl = environment.apiUrl;
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private utilService: UtilService,
  ) {
    router.queryParams.subscribe(query => {
      this.product.id = query._id;
    });
  }

  ngOnInit(): void {
    this.utilService.get('product/product?range=_id&_id=' + this.product.id).subscribe(result => {
      this.product = result.body;
      this.variants = this.product.variant_products.map(variant => variant.name);
    });
  }

  openTag(tag): void {
    this.route.navigate(['/dashboard/product/products'], {queryParams: {property: 'tag', value: tag}});
  }

  genImageUrl(url: string | SVGImageElement): string {
    return this.apiUrl + 'util/file/' + url;
  }
}
