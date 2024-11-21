import { Component } from '@angular/core';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {TabDataService} from '../tab-data.service';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-tab-two',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './tab-two.component.html',
  styleUrl: './tab-two.component.css'
})
export class TabTwoComponent {
  constructor(public tabDataService: TabDataService) { }
}
