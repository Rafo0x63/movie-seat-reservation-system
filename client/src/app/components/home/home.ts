import { Component } from '@angular/core';
import {SelectorComponent} from '../selector-component/selector-component';

@Component({
  selector: 'app-home',
  imports: [
    SelectorComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
