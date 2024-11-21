import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {TabDataService} from '../tab-data.service';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-tab-three',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './tab-three.component.html',
  styleUrl: './tab-three.component.css'
})
export class TabThreeComponent {
  constructor(public tabDataService: TabDataService) { }
}
