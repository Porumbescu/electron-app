// tab-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabDataService {
  tabOneData: string = '';
  tabTwoData: string = '';
  tabThreeData: string = '';
}
