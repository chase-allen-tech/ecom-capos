import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}


const MENUITEMS = [
  { state: 'features', type: 'link', name: 'FEATURES', icon: '../../../assets/image/interface/home/features.png' },
  { state: 'how-it-works', type: 'link', name: 'HOW IT WORKS', icon: '../../../assets/image/interface/home/how.png' },
  { state: 'support', type: 'link', name: 'SUPPORT', icon: '../../../assets/image/interface/home/support.png' },
  { state: 'pricing', type: 'link', name: 'PRICING', icon: '../../../assets/image/interface/home/pricing.png' },
  { state: 'faq', type: 'link', name: 'FAQ', icon: '../../../assets/image/interface/home/faq.png' },
  { state: 'blog', type: 'link', name: 'BLOG', icon: '../../../assets/image/interface/home/blog.png' },
];


@Injectable({
  providedIn: 'root'
})
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
