import {
  Component, EventEmitter, OnInit, Output
} from '@angular/core';
import { Router } from '@angular/router';
import { UserTypes } from '../../../../enums/UserTypes';
import { User } from '../../../../models';
import { AuthService } from '../../../../services';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
})
export class ToolBarComponent implements OnInit {
  @Output('toogle') toggle = new EventEmitter();

  user: Partial<User> | undefined = undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
    this.user = undefined;
  }

  isAdmin(): boolean {
    return this.user?.type == UserTypes.Admin;
  }
}
