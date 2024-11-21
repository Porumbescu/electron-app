import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TabOneComponent } from './tab-one/tab-one.component';
import { TabTwoComponent } from './tab-two/tab-two.component';
import { TabThreeComponent } from './tab-three/tab-three.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatTabsModule,
    TabOneComponent,
    TabTwoComponent,
    TabThreeComponent,
  ],
})
export class AppComponent {
}
