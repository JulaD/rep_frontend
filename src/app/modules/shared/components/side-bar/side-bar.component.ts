import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  sidebarOptions: string[] = ['Opción 1', 'Opción 2', 'Opción 3'];

  ngOnInit(): void {
  }
}
