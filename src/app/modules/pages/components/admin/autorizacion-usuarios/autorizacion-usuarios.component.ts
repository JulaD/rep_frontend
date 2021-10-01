import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services';
import { User } from '../../../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autorizacion-usuarios',
  templateUrl: './autorizacion-usuarios.component.html',
  styleUrls: ['./autorizacion-usuarios.component.css']
})
export class AutorizacionUsuariosComponent implements OnInit {

  pendingUsers: User[] = [];
  currentPendingUsers: User[] = [];
  acceptedUsers: User[] = [];
  currentAcceptedUsers: User[] = [];
  pendingUsersCount: number = 0;
  acceptedUsersCount: number = 0;
  pendingUsersPageCount: number = 0;
  acceptedUsersPageCount: number = 0;
  pendingUsersCurrentPage: number = 0;
  acceptedUsersCurrentPage: number = 0;
  pendingUsersCurrentPages: number[] = [];
  acceptedUsersCurrentPages: number[] = [];
  message: string = '';
  successAlert: boolean = false;
  errorAlert : boolean = false;

  constructor(
    public userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.userService.getUsers().subscribe (
      res => {
        const users: User[] = res.rows;
        users.forEach(user => {
          if (user.status == 0) {
            this.pendingUsers.push(user);
          }
          if (user.status == 1) {
            this.acceptedUsers.push(user);
          }
        });
        this.pendingUsersCount = this.pendingUsers.length;
        this.acceptedUsersCount = this.acceptedUsers.length;
        this.pendingUsersPageCount = Math.ceil(this.pendingUsersCount/5);
        this.acceptedUsersPageCount = Math.ceil(this.acceptedUsersCount/5);
        if (this.pendingUsersPageCount > 0) {
          this.goToPendingPage(1);
        }
        if (this.acceptedUsersPageCount > 0) {
          this.goToAcceptedPage(1);
        }
        console.log(this.pendingUsers);
        console.log(this.acceptedUsers);
        console.log(this.pendingUsersCount);
        console.log(this.acceptedUsersCount);
        console.log(this.pendingUsersPageCount);
        console.log(this.acceptedUsersPageCount);
      },
      err => {
        console.log(err);
      }
    );
  }

  goToPendingPage(page: number) {
    if (page != this.pendingUsersCurrentPage && 1 <= page && page <= this.pendingUsersPageCount) {
      this.pendingUsersCurrentPage = page;
      if (page == 1) {
        this.pendingUsersCurrentPages = Array(Math.min((page+2), this.pendingUsersPageCount)).fill(undefined).map((_, idx) => 1 + idx);
      } else if (page == this.pendingUsersPageCount) {
        this.pendingUsersCurrentPages = Array(page - Math.max((page-2), 1) + 1).fill(undefined).map((_, idx) => Math.max((page-2), 1) + idx);
      } else {
        this.pendingUsersCurrentPages = Array((page+1) - (page-1) + 1).fill(undefined).map((_, idx) => (page-1) + idx);
      }
      this.currentPendingUsers = this.pendingUsers.slice(5*(page-1), Math.min((5*page), this.pendingUsersCount));
      this.togglePendingPageNumber(page);
    }
  }

  goToAcceptedPage(page: number) {
    if (page != this.acceptedUsersCurrentPage && 1 <= page && page <= this.acceptedUsersPageCount) {
      this.acceptedUsersCurrentPage = page;
      if (page == 1) {
        this.acceptedUsersCurrentPages = Array(Math.min((page+2), this.acceptedUsersPageCount)).fill(undefined).map((_, idx) => 1 + idx);
      } else if (page == this.acceptedUsersPageCount) {
        this.acceptedUsersCurrentPages = Array(page - Math.max((page-2), 1) + 1).fill(undefined).map((_, idx) => Math.max((page-2), 1) + idx);
      } else {
        this.acceptedUsersCurrentPages = Array((page+1) - (page-1) + 1).fill(undefined).map((_, idx) => (page-1) + idx);
      }
      this.currentAcceptedUsers = this.acceptedUsers.slice(5*(page-1), Math.min((5*page), this.acceptedUsersCount));
      this.toggleAcceptedPageNumber(page);
    }
  }

  togglePendingPageNumber(page: number) {
    var element = document.getElementById('pending' + page.toString());
    Array.from(document.getElementsByClassName("pending")).forEach(elem => {
      elem.classList.remove("active");
    });
    if (element){
      element.classList.add("active");
    }
  }

  toggleAcceptedPageNumber(page: number) {
    var element = document.getElementById('accepted' + page.toString());
    Array.from(document.getElementsByClassName("accepted")).forEach(elem => {
      elem.classList.remove("active");
    });
    if (element){
      element.classList.add("active");
    }
  }

  goToPreviousPendingPage() {
    if (this.pendingUsersPageCount > 0 && this.pendingUsersCurrentPage != 1) {
      this.goToPendingPage(this.pendingUsersCurrentPage - 1);
    }
  }

  goToNextPendingPage() {
    if (this.pendingUsersPageCount > 0 && this.pendingUsersCurrentPage != this.pendingUsersPageCount) {
      this.goToPendingPage(this.pendingUsersCurrentPage + 1);
    }
  }

  goToPreviousAcceptedPage() {
    if (this.acceptedUsersPageCount > 0 && this.acceptedUsersCurrentPage != 1) {
      this.goToAcceptedPage(this.acceptedUsersCurrentPage - 1);
    }
  }

  goToNextAcceptedPage() {
    if (this.acceptedUsersPageCount > 0 && this.acceptedUsersCurrentPage != this.acceptedUsersPageCount) {
      this.goToAcceptedPage(this.acceptedUsersCurrentPage + 1);
    }
  }

  showAccepted() {
    var section = document.querySelector('section');
    if (section != null){
      section.classList.add("active");
    }
  }
  showPending() {
    var section = document.querySelector('section');
    if (section != null){
      section.classList.remove("active");
    }
  }

  approve(id: number) {
    this.userService.approve(id).subscribe (
      res => {
        this.message = 'El usuario ha sido aceptado exitosamente.'
        this.successAlert = true;
        this.errorAlert = false;
        //window.location.reload();
      },
      err => {
        this.message = 'Hubo un problema.'
        this.successAlert = false;
        this.errorAlert = true;
        console.log(err);
      }
    );
  }

  cancel(id: number) {
    this.userService.cancel(id).subscribe (
      res => {
        this.message = 'El usuario ha sido cancelado exitosamente.'
        this.successAlert = true;
        this.errorAlert = false;
        //window.location.reload();
      },
      err => {
        this.message = 'Hubo un problema.'
        this.successAlert = false;
        this.errorAlert = true;
        console.log(err);
      }
    );
  }

  closeAlert() {
    this.message= '';
    this.successAlert = false;
    this.errorAlert  = false;
  }

}
