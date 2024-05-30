import { Component, OnInit, Injectable, ViewEncapsulation } from '@angular/core';
declare function renderAll(): any;
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  encapsulation: ViewEncapsulation.None
})
@Injectable({
  providedIn: 'root'
})
export class FormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
      renderAll();
  }
}
