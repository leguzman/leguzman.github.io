import { Component } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { TabContentComponent } from '../tab-content/tab-content.component';

@Component({
  selector: 'app-data-presenter',
  standalone: true,
  imports: [TabsComponent, TabContentComponent],
  templateUrl: './data-presenter.component.html',
  styleUrl: './data-presenter.component.css',
})
export class DataPresenterComponent {}
