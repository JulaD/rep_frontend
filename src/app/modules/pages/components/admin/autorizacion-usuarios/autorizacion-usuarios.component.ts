import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService, AuthService } from '../../../../../services';
import { User } from '../../../../../models/user.model';

@Component({
  selector: 'app-autorizacion-usuarios',
  templateUrl: './autorizacion-usuarios.component.html',
  styleUrls: ['./autorizacion-usuarios.component.css'],
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

  currentUser: Partial<User> | undefined = undefined;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.init('');
  }

  init(busqueda: string) {
    this.currentUser = this.authService.getUser();
    this.userService.getUsers('pending', 4, 0, busqueda).subscribe(
      (res) => {
        this.pendingUsersCount = res.count;
        this.pendingUsers = res.rows;
        this.pendingUsersPageCount = Math.ceil(this.pendingUsersCount / 4);
        if (this.pendingUsersPageCount > 0) {
          this.goToPendingPage(1);
        }
      },
      (err) => {
        console.error(err);
      },
    );
    this.userService.getUsers('approved', 4, 0, busqueda).subscribe(
      (res) => {
        this.acceptedUsersCount = res.count;
        this.acceptedUsers = res.rows;
        this.acceptedUsersPageCount = Math.ceil(this.acceptedUsersCount / 4);
        if (this.acceptedUsersPageCount > 0) {
          this.goToAcceptedPage(1);
        }
      },
      (err) => {
        console.error(err);
      },
    );
  }

  searchPending() {
    const busquedaInput: any = document.getElementById('busquedaPendientes');
    if (busquedaInput) {
      this.pendingUsersSearch = busquedaInput.value;
      this.userService.getUsers('pending', 4, 0, this.pendingUsersSearch).subscribe(
        (res) => {
          this.message = '';
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
        (err) => {
          console.error(err);
        },
      );
    }
  }

  searchAccepted() {
    const busquedaInput: any = document.getElementById('busquedaAceptados');
    if (busquedaInput) {
      this.acceptedUsersSearch = busquedaInput.value;
      this.userService.getUsers('pending', 4, 0, this.acceptedUsersSearch).subscribe(
        (res) => {
          this.message = '';
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
        (err) => {
          console.error(err);
        },
      );
    }
  }

  goToPendingPage(page: number) {
    if (page >= 1 && page <= this.pendingUsersPageCount) {
      this.userService.getUsers('pending', 4, (page - 1) * 4, this.pendingUsersSearch).subscribe(
        (res) => {
          this.pendingUsersCurrentPage = page;
          this.pendingUsersCount = res.count;
          this.pendingUsers = res.rows;
          this.pendingUsersPageCount = Math.ceil(this.pendingUsersCount / 4);
          if (page === 1) {
            this.pendingUsersCurrentPages = Array(Math.min((page + 2),
              this.pendingUsersPageCount)).fill(undefined).map((_, idx) => 1 + idx);
          } else if (page === this.pendingUsersPageCount) {
            this.pendingUsersCurrentPages = Array(page - Math.max((page - 2), 1) + 1)
              .fill(undefined).map((_, idx) => Math.max((page - 2), 1) + idx);
          } else {
            this.pendingUsersCurrentPages = Array((page + 1) - (page - 1) + 1)
              .fill(undefined).map((_, idx) => (page - 1) + idx);
          }
        },
        (err) => {
          console.error(err);
        },
      );
    }
  }

  goToAcceptedPage(page: number) {
    if (page >= 1 && page <= this.acceptedUsersPageCount) {
      this.userService.getUsers('approved', 4, (page - 1) * 4, this.acceptedUsersSearch).subscribe(
        (res) => {
          this.acceptedUsersCurrentPage = page;
          this.acceptedUsersCount = res.count;
          this.acceptedUsers = res.rows;
          this.acceptedUsersPageCount = Math.ceil(this.acceptedUsersCount / 4);
          if (page === 1) {
            this.acceptedUsersCurrentPages = Array(Math.min((page + 2),
              this.acceptedUsersPageCount)).fill(undefined).map((_, idx) => 1 + idx);
          } else if (page === this.acceptedUsersPageCount) {
            this.acceptedUsersCurrentPages = Array(page - Math.max((page - 2), 1) + 1)
              .fill(undefined).map((_, idx) => Math.max((page - 2), 1) + idx);
          } else {
            this.acceptedUsersCurrentPages = Array((page + 1) - (page - 1) + 1)
              .fill(undefined).map((_, idx) => (page - 1) + idx);
          }
        },
        (err) => {
          console.error(err);
        },
      );
    }
  }

  goToPreviousPendingPage() {
    if (this.pendingUsersPageCount > 0 && this.pendingUsersCurrentPage !== 1) {
      this.goToPendingPage(this.pendingUsersCurrentPage - 1);
    }
  }

  goToNextPendingPage() {
    if (this.pendingUsersPageCount > 0
        && this.pendingUsersCurrentPage !== this.pendingUsersPageCount) {
      this.goToPendingPage(this.pendingUsersCurrentPage + 1);
    }
  }

  goToPreviousAcceptedPage() {
    if (this.acceptedUsersPageCount > 0
        && this.acceptedUsersCurrentPage !== 1) {
      this.goToAcceptedPage(this.acceptedUsersCurrentPage - 1);
    }
  }

  goToNextAcceptedPage() {
    if (this.acceptedUsersPageCount > 0
        && this.acceptedUsersCurrentPage !== this.acceptedUsersPageCount) {
      this.goToAcceptedPage(this.acceptedUsersCurrentPage + 1);
    }
  }

  showAccepted() {
    const section = document.querySelector('section');
    if (section != null) {
      section.classList.add('active');
    }
  }

  showPending() {
    const section = document.querySelector('section');
    if (section != null) {
      section.classList.remove('active');
    }
  }

  approve(id: number, name: string) {
    Swal.fire({
      title: 'Confirmar',
      text: `Autorizar a ${name} a utilizar la aplicación`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.approve(id).subscribe(
          () => {
            Swal.fire(
              '¡Éxito!',
              `Se ha autorizado a ${name} a utilizar la aplicación.`,
            );
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
          (err) => {
            Swal.fire(
              '¡Error!',
              'Hubo un problema',
            );
            console.error(err);
          },
        );
      }
    });
  }

  cancel(id: number, name: string) {
    Swal.fire({
      title: 'Confirmar',
      text: `Cancelar autorización para utilizar la aplpicación a ${name}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.cancel(id).subscribe(
          () => {
            Swal.fire(
              '¡Éxito!',
              `${name} ya no está autorizado para utilizar la aplicación.`,
            );
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
          (err) => {
            Swal.fire(
              '¡Error!',
              'Hubo un problema',
            );
            console.error(err);
          },
        );
      }
    });
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
