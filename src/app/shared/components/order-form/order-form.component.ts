import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  @Input('orders') orders;

  constructor() { }

  ngOnInit() {
  }

}
