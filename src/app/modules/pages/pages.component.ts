import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  opened: boolean = false;

  ngOnInit(): void {
  }

  sideBarToggle(): void {
    this.opened = !this.opened;
  }
}
