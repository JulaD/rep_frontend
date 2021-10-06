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
  acceptedUsers: User[] = [];
  pendingUsersCount: number = 0;
  acceptedUsersCount: number = 0;
  pendingUsersPageCount: number = 0;
  acceptedUsersPageCount: number = 0;
  pendingUsersCurrentPage: number = 0;
  acceptedUsersCurrentPage: number = 0;
  pendingUsersCurrentPages: number[] = [];
  acceptedUsersCurrentPages: number[] = [];
  pendingUsersSearch: string = '';
  acceptedUsersSearch: string = '';
  message: string = '';
  successAlert: boolean = false;
  errorAlert: boolean = false;

  constructor(
    public userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.init('');
  }

  init(busqueda: string) {
    this.userService.getPendingUsers(4, 0, '').subscribe(
      res => {
        this.pendingUsersCount = res.count;
        this.pendingUsers = res.rows;
        this.pendingUsersPageCount = Math.ceil(this.pendingUsersCount / 4);
        if (this.pendingUsersPageCount > 0) {
          this.goToPendingPage(1);
        }
      },
      err => {
        console.log(err);
      }
    );
    this.userService.getApprovedUsers(4, 0, '').subscribe(
      res => {
        this.acceptedUsersCount = res.count;
        this.acceptedUsers = res.rows;
        this.acceptedUsersPageCount = Math.ceil(this.acceptedUsersCount / 4);
        if (this.acceptedUsersPageCount > 0) {
          this.goToAcceptedPage(1);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  searchPending() {
    const busquedaInput: any = document.getElementById('busquedaPendientes');
    if (busquedaInput) {
      this.pendingUsersSearch = busquedaInput.value;
      this.userService.getPendingUsers(4, 0, this.pendingUsersSearch).subscribe(
        res => {
          this.message = ''
          this.successAlert = false;
          this.errorAlert = false;
          this.pendingUsers = [];
          this.pendingUsersCount = 0;
          this.pendingUsersPageCount = 0;
          this.pendingUsersCurrentPage = 0;
          this.pendingUsersCurrentPages = [];
          this.pendingUsersCount = res.count;
          this.pendingUsers = res.rows;
          this.pendingUsersPageCount = Math.ceil(this.pendingUsersCount / 4);
          if (this.pendingUsersPageCount > 0) {
            this.goToPendingPage(1);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  searchAccepted() {
    const busquedaInput: any = document.getElementById('busquedaAceptados');
    if (busquedaInput) {
      this.acceptedUsersSearch = busquedaInput.value;
      this.userService.getApprovedUsers(4, 0, this.acceptedUsersSearch).subscribe(
        res => {
          this.message = ''
          this.successAlert = false;
          this.errorAlert = false;
          this.acceptedUsers = [];
          this.acceptedUsersCount = 0;
          this.acceptedUsersPageCount = 0;
          this.acceptedUsersCurrentPage = 0;
          this.acceptedUsersCurrentPages = [];
          this.acceptedUsersCount = res.count;
          this.acceptedUsers = res.rows;
          this.acceptedUsersPageCount = Math.ceil(this.acceptedUsersCount / 4);
          if (this.acceptedUsersPageCount > 0) {
            this.goToAcceptedPage(1);
          }
        },
        err => {
          console.log(err);
        }
      );

    }
  }

  goToPendingPage(page: number) {
    if (1 <= page && page <= this.pendingUsersPageCount) {
      this.userService.getPendingUsers(4, (page - 1) * 4, this.pendingUsersSearch).subscribe(
        res => {
          this.pendingUsersCurrentPage = page;
          this.pendingUsersCount = res.count;
          this.pendingUsers = res.rows;
          this.pendingUsersPageCount = Math.ceil(this.pendingUsersCount / 4);
          if (page == 1) {
            this.pendingUsersCurrentPages = Array(Math.min((page + 2), this.pendingUsersPageCount)).fill(undefined).map((_, idx) => 1 + idx);
          } else if (page == this.pendingUsersPageCount) {
            this.pendingUsersCurrentPages = Array(page - Math.max((page - 2), 1) + 1).fill(undefined).map((_, idx) => Math.max((page - 2), 1) + idx);
          } else {
            this.pendingUsersCurrentPages = Array((page + 1) - (page - 1) + 1).fill(undefined).map((_, idx) => (page - 1) + idx);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  goToAcceptedPage(page: number) {
    if (1 <= page && page <= this.acceptedUsersPageCount) {
      this.userService.getApprovedUsers(4, (page - 1) * 4, this.acceptedUsersSearch).subscribe(
        res => {
          this.acceptedUsersCurrentPage = page;
          this.acceptedUsersCount = res.count;
          this.acceptedUsers = res.rows;
          this.acceptedUsersPageCount = Math.ceil(this.acceptedUsersCount / 4);
          if (page == 1) {
            this.acceptedUsersCurrentPages = Array(Math.min((page + 2), this.acceptedUsersPageCount)).fill(undefined).map((_, idx) => 1 + idx);
          } else if (page == this.acceptedUsersPageCount) {
            this.acceptedUsersCurrentPages = Array(page - Math.max((page - 2), 1) + 1).fill(undefined).map((_, idx) => Math.max((page - 2), 1) + idx);
          } else {
            this.acceptedUsersCurrentPages = Array((page + 1) - (page - 1) + 1).fill(undefined).map((_, idx) => (page - 1) + idx);
          }
        },
        err => {
          console.log(err);
        }
      );
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
    if (section != null) {
      section.classList.add("active");
    }
  }
  showPending() {
    var section = document.querySelector('section');
    if (section != null) {
      section.classList.remove("active");
    }
  }

  approve(id: number, name: string) {
    const res = confirm("Confirmar autorización para " + name);
    if (res) {
      this.userService.approve(id).subscribe(
        res => {
          this.message = 'El usuario ha sido aceptado exitosamente.'
          this.successAlert = true;
          this.errorAlert = false;
          this.pendingUsers = [];
          this.acceptedUsers = [];
          this.pendingUsersCount = 0;
          this.acceptedUsersCount = 0;
          this.pendingUsersPageCount = 0;
          this.acceptedUsersPageCount = 0;
          this.pendingUsersCurrentPage = 0;
          this.acceptedUsersCurrentPage = 0;
          this.pendingUsersCurrentPages = [];
          this.acceptedUsersCurrentPages = [];
          this.pendingUsersSearch = '';
          this.acceptedUsersSearch = '';
          this.init('');
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
      this.userService.cancel(id).subscribe(
        res => {
          this.message = 'El usuario ha sido cancelado exitosamente.'
          this.successAlert = true;
          this.errorAlert = false;
          this.pendingUsers = [];
          this.acceptedUsers = [];
          this.pendingUsersCount = 0;
          this.acceptedUsersCount = 0;
          this.pendingUsersPageCount = 0;
          this.acceptedUsersPageCount = 0;
          this.pendingUsersCurrentPage = 0;
          this.acceptedUsersCurrentPage = 0;
          this.pendingUsersSearch = '';
          this.acceptedUsersSearch = '';
          this.init('');
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
    this.message = '';
    this.successAlert = false;
    this.errorAlert = false;
  }

  resetPendingSearch() {
    const busquedaInput: any = document.getElementById('busquedaPendientes');
    if (busquedaInput) {
      busquedaInput.value = '';
      this.searchPending();
    }
  }

  resetAcceptedSearch() {
    const busquedaInput: any = document.getElementById('busquedaAceptados');
    if (busquedaInput) {
      busquedaInput.value = '';
      this.searchAccepted();
    }
  }
}
