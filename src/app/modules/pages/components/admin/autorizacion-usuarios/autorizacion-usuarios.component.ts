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
        /*console.log(this.pendingUsers);
        console.log(this.acceptedUsers);
        console.log(this.pendingUsersCount);
        console.log(this.acceptedUsersCount);
        console.log(this.pendingUsersPageCount);
        console.log(this.acceptedUsersPageCount);*/
      },
      err => {
        console.log(err);
      }
    );
  }

  searchPending() {
    /*const busquedaInput:any  = document.getElementById('busquedaPendientes');
    if (busquedaInput) {
      var busqueda: string = busquedaInput.value;
      var pendingUsersFound: User[] = [];
      this.pendingUsers.forEach(user => {
        if (user.name.match(busqueda) || user.email.match(busqueda)) {
          pendingUsersFound.push(user);
        }
      })
      console.log(pendingUsersFound);
    }*/
  }

  goToPendingPage(page: number) {
    if (1 <= page && page <= this.pendingUsersPageCount) {
      this.pendingUsersCurrentPage = page;
      if (page == 1) {
        this.pendingUsersCurrentPages = Array(Math.min((page+2), this.pendingUsersPageCount)).fill(undefined).map((_, idx) => 1 + idx);
      } else if (page == this.pendingUsersPageCount) {
        this.pendingUsersCurrentPages = Array(page - Math.max((page-2), 1) + 1).fill(undefined).map((_, idx) => Math.max((page-2), 1) + idx);
      } else {
        this.pendingUsersCurrentPages = Array((page+1) - (page-1) + 1).fill(undefined).map((_, idx) => (page-1) + idx);
      }
      this.currentPendingUsers = this.pendingUsers.slice(5*(page-1), Math.min((5*page), this.pendingUsersCount));
      //this.togglePendingPageNumber(page);
    }
  }

  goToAcceptedPage(page: number) {
    if (1 <= page && page <= this.acceptedUsersPageCount) {
      this.acceptedUsersCurrentPage = page;
      if (page == 1) {
        this.acceptedUsersCurrentPages = Array(Math.min((page+2), this.acceptedUsersPageCount)).fill(undefined).map((_, idx) => 1 + idx);
      } else if (page == this.acceptedUsersPageCount) {
        this.acceptedUsersCurrentPages = Array(page - Math.max((page-2), 1) + 1).fill(undefined).map((_, idx) => Math.max((page-2), 1) + idx);
      } else {
        this.acceptedUsersCurrentPages = Array((page+1) - (page-1) + 1).fill(undefined).map((_, idx) => (page-1) + idx);
      }
      this.currentAcceptedUsers = this.acceptedUsers.slice(5*(page-1), Math.min((5*page), this.acceptedUsersCount));
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

  approve(id: number, name: string) {
    const res = confirm("Confirmar autorización para " + name);
    if (res) {
      this.userService.approve(id).subscribe (
        res => {
          this.message = 'El usuario ha sido aceptado exitosamente.'
          this.successAlert = true;
          this.errorAlert = false;
          this.pendingUsers = [];
          this.currentPendingUsers = [];
          this.acceptedUsers = [];
          this.currentAcceptedUsers = [];
          this.pendingUsersCount = 0;
          this.acceptedUsersCount = 0;
          this.pendingUsersPageCount = 0;
          this.acceptedUsersPageCount = 0;
          this.pendingUsersCurrentPage = 0;
          this.acceptedUsersCurrentPage = 0;
          this.pendingUsersCurrentPages = [];
          this.acceptedUsersCurrentPages = [];
          this.init();
        },
        err => {
          this.message = 'Hubo un problema.'
          this.successAlert = false;
          this.errorAlert = true;
          console.log(err);
        }
      );
    }
  }

  cancel(id: number, name: string) {
    const res = confirm("Cancelar autorización para " + name);
    if (res) {
      this.userService.cancel(id).subscribe (
        res => {
          this.message = 'El usuario ha sido cancelado exitosamente.'
          this.successAlert = true;
          this.errorAlert = false;
          this.pendingUsers = [];
          this.currentPendingUsers = [];
          this.acceptedUsers = [];
          this.currentAcceptedUsers = [];
          this.pendingUsersCount = 0;
          this.acceptedUsersCount = 0;
          this.pendingUsersPageCount = 0;
          this.acceptedUsersPageCount = 0;
          this.pendingUsersCurrentPage = 0;
          this.acceptedUsersCurrentPage = 0;
          this.pendingUsersCurrentPages = [];
          this.acceptedUsersCurrentPages = [];
          this.init();
        },
        err => {
          this.message = 'Hubo un problema.'
          this.successAlert = false;
          this.errorAlert = true;
          console.log(err);
        }
      );
    }
  }

  closeAlert() {
    this.message= '';
    this.successAlert = false;
    this.errorAlert  = false;
  }

}
