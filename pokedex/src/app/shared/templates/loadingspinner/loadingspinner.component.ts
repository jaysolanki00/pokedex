import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'poke-loadingspinner',
  templateUrl: './loadingspinner.component.html',
  styleUrls: ['./loadingspinner.component.less']
})
export class LoadingspinnerComponent implements OnInit {

  @Input() isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
