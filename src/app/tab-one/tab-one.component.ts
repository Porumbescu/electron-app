import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {TabDataService} from '../tab-data.service';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-tab-one',
  standalone: true,
    imports: [
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
    ],
  templateUrl: './tab-one.component.html',
  styleUrl: './tab-one.component.css'
})
export class TabOneComponent {
  constructor(public tabDataService: TabDataService) { }
}
