import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../../../services';
import { User } from '../../../../../models/user.model';

@Component({
  selector: 'app-permisos-usuarios',
  templateUrl: './permisos-usuarios.component.html',
  styleUrls: ['./permisos-usuarios.component.css'],
})

export class PermisosUsuariosComponent implements OnInit {
  users: User[] = [];

  admins: User[] = [];

  usersCount: number = 0;

  adminsCount: number = 0;

  usersPageCount: number = 0;

  adminsPageCount: number = 0;

  usersCurrentPage: number = 0;

  adminsCurrentPage: number = 0;

  usersCurrentPages: number[] = [];

  adminsCurrentPages: number[] = [];

  usersSearch: string = '';

  adminsSearch: string = '';

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
    this.userService.getUsers(4, 0, busqueda).subscribe(
      (res) => {
        console.log(res.rows);
        this.usersCount = res.count;
        this.users = res.rows;
        this.usersPageCount = Math.ceil(this.usersCount / 4);
        if (this.usersPageCount > 0) {
          this.goToUserPage(1);
        }
      },
      (err) => {
        console.log(err);
      },
    );
    this.userService.getAdmins(4, 0, busqueda).subscribe(
      (res) => {
        this.adminsCount = res.count;
        this.admins = res.rows;
        this.adminsPageCount = Math.ceil(this.adminsCount / 4);
        if (this.adminsPageCount > 0) {
          this.goToAdminPage(1);
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  goToUserPage(page: number) {
    if (page >= 1 && page <= this.usersPageCount) {
      this.userService.getUsers(4, (page - 1) * 4, this.usersSearch).subscribe(
        (res) => {
          this.usersCurrentPage = page;
          this.usersCount = res.count;
          this.users = res.rows;
          this.usersPageCount = Math.ceil(this.usersCount / 4);
          if (page === 1) {
            this.usersCurrentPages = Array(Math.min((page + 2),
              this.usersPageCount)).fill(undefined).map((_, idx) => 1 + idx);
          } else if (page === this.usersPageCount) {
            this.usersCurrentPages = Array(page - Math.max((page - 2), 1) + 1)
              .fill(undefined).map((_, idx) => Math.max((page - 2), 1) + idx);
          } else {
            this.usersCurrentPages = Array((page + 1) - (page - 1) + 1)
              .fill(undefined).map((_, idx) => (page - 1) + idx);
          }
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  goToAdminPage(page: number) {
    if (page >= 1 && page <= this.adminsPageCount) {
      this.userService.getAdmins(4, (page - 1) * 4, this.adminsSearch).subscribe(
        (res) => {
          this.adminsCurrentPage = page;
          this.adminsCount = res.count;
          this.admins = res.rows;
          this.adminsPageCount = Math.ceil(this.adminsCount / 4);
          if (page === 1) {
            this.adminsCurrentPages = Array(Math.min((page + 2),
              this.adminsPageCount)).fill(undefined).map((_, idx) => 1 + idx);
          } else if (page === this.adminsPageCount) {
            this.adminsCurrentPages = Array(page - Math.max((page - 2), 1) + 1)
              .fill(undefined).map((_, idx) => Math.max((page - 2), 1) + idx);
          } else {
            this.adminsCurrentPages = Array((page + 1) - (page - 1) + 1)
              .fill(undefined).map((_, idx) => (page - 1) + idx);
          }
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  goToPreviousUserPage() {
    if (this.usersPageCount > 0 && this.usersCurrentPage !== 1) {
      this.goToUserPage(this.usersCurrentPage - 1);
    }
  }

  goToNextUserPage() {
    if (this.usersPageCount > 0 && this.usersCurrentPage !== this.usersPageCount) {
      this.goToUserPage(this.usersCurrentPage + 1);
    }
  }

  goToPreviousAdminPage() {
    if (this.adminsPageCount > 0 && this.adminsCurrentPage !== 1) {
      this.goToAdminPage(this.adminsCurrentPage - 1);
    }
  }

  goToNextAdminPage() {
    if (this.adminsPageCount > 0 && this.adminsCurrentPage !== this.adminsPageCount) {
      this.goToAdminPage(this.adminsCurrentPage + 1);
    }
  }

  giveAdminPermission(id: number, name: string) {
    Swal.fire({
      title: 'Confirmar',
      text: `Dar permisos de Administrador a ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.giveAdminPermission(id).subscribe(
          () => {
            Swal.fire(
              '¡Éxito!',
              `Se han otorgado permisos de Administrador para ${name}.`,
            );
            this.users = [];
            this.admins = [];
            this.usersCount = 0;
            this.adminsCount = 0;
            this.usersPageCount = 0;
            this.adminsPageCount = 0;
            this.usersCurrentPage = 0;
            this.adminsCurrentPage = 0;
            this.usersCurrentPages = [];
            this.adminsCurrentPages = [];
            this.usersSearch = '';
            this.adminsSearch = '';
            this.init('');
          },
          (err) => {
            Swal.fire(
              '¡Error!',
              'Hubo un problema',
            );
            console.log(err);
          },
        );
      }
    });
  }

  removeAdminPermission(id: number, name: string) {
    Swal.fire({
      title: 'Confirmar',
      text: `Quitar permisos de Administrador a ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.removeAdminPermission(id).subscribe(
          () => {
            Swal.fire(
              '¡Éxito!',
              `Se le han quitado los permisos de Administrador a ${name}.`,
            );
            this.users = [];
            this.admins = [];
            this.usersCount = 0;
            this.adminsCount = 0;
            this.usersPageCount = 0;
            this.adminsPageCount = 0;
            this.usersCurrentPage = 0;
            this.adminsCurrentPage = 0;
            this.usersCurrentPages = [];
            this.adminsCurrentPages = [];
            this.usersSearch = '';
            this.adminsSearch = '';
            this.init('');
          },
          (err) => {
            Swal.fire(
              '¡Error!',
              'Hubo un problema',
            );
            console.log(err);
          },
        );
      }
    });
  }

  mostrarAceptados() {
    const section = document.querySelector('section');
    if (section != null) {
      section.classList.add('active');
    }
  }

  mostrarPendientes() {
    const section = document.querySelector('section');
    if (section != null) {
      section.classList.remove('active');
    }
  }

  closeAlert() {
    this.message = '';
    this.successAlert = false;
    this.errorAlert = false;
  }

  searchAdmins() {
    const busquedaInput: any = document.getElementById('busquedaAdministradores');
    if (busquedaInput) {
      this.adminsSearch = busquedaInput.value;
      this.userService.getAdmins(4, 0, this.adminsSearch).subscribe(
        (res) => {
          this.message = '';
          this.successAlert = false;
          this.errorAlert = false;
          this.admins = [];
          this.adminsCount = 0;
          this.adminsPageCount = 0;
          this.adminsCurrentPage = 0;
          this.adminsCurrentPages = [];
          this.adminsCount = res.count;
          this.admins = res.rows;
          this.adminsPageCount = Math.ceil(this.adminsCount / 4);
          if (this.adminsPageCount > 0) {
            this.goToAdminPage(1);
          }
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  searchUsers() {
    const busquedaInput: any = document.getElementById('busquedaUsuarios');
    if (busquedaInput) {
      this.usersSearch = busquedaInput.value;
      this.userService.getUsers(4, 0, this.usersSearch).subscribe(
        (res) => {
          this.message = '';
          this.successAlert = false;
          this.errorAlert = false;
          this.users = [];
          this.usersCount = 0;
          this.usersPageCount = 0;
          this.usersCurrentPage = 0;
          this.usersCurrentPages = [];
          this.usersCount = res.count;
          this.users = res.rows;
          this.usersPageCount = Math.ceil(this.usersCount / 4);
          if (this.usersPageCount > 0) {
            this.goToUserPage(1);
          }
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  resetUsersSearch() {
    const busquedaInput: any = document.getElementById('busquedaUsuarios');
    if (busquedaInput) {
      busquedaInput.value = '';
      this.searchUsers();
    }
  }

  resetAdminsSearch() {
    const busquedaInput: any = document.getElementById('busquedaAdministradores');
    if (busquedaInput) {
      busquedaInput.value = '';
      this.searchAdmins();
    }
  }
}
