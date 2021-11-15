import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-expansion-panel',
  templateUrl: './faq-expansion-panel.component.html',
  styleUrls: ['./faq-expansion-panel.component.css'],
})
export class FaqExpansionPanelComponent implements OnInit {
  panelOpenState = false;

  @Input('question') question: string;

  @Input('answer') answer: string;

  ngOnInit(): void {}
}
