import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  @Output('toogle') toggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
