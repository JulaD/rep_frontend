https://www.youtube.com/watch?v=D6qPDww2X8k

----Como correr los test ----

Para crear un test para un correspondiente componente se debe proceder de la siguiente forma:
    -Para un componente ```ejemplo.component.ts``` creado mediante el comando ```ng g component ejemplo``` un archivo llamado ```ejemplo.component.sepc.ts``` será creado automaticamente dentro de la carpeta ```app```
    -Dentro del archivo ```ejemplo.component.ts``` incluir el componente a testear con ```import { NombreDelComponente } from './ejemplo.component';```
    -Para cada función a probar ```funcionEjemplo(arg)``` la forma de diseñar un test es:
        -```test(Desc, () => {expect(funcionEjemplo(ejemploArg)).toBe(resultado);});```
    -Aqui los argumentos son:
        -```funcionEjemplo``` = es la funcion que esta siendo probada, que tiene como inputs ```arg```
        -```Desc```           = es un string, que debe describir brevemente el test que se lleva a cabo
        -```ejemploArg```     = son los argumentos con los cuales se testeará la ```funcionEjemplo```
        -```resultado```      = es el retorno esperado de ```funcionEjemplo``` con los argumentos ```ejemploArg```
    -Pueden agrupar los test con ```describe("Nombre del grupo de tests", () =>{}```, dentro de ese bloque se especifican los test al igual que antes, cambiando ```test``` por ```it```

    -Si alguno de los componentes que está siendo probado, cuenta con una dependencia de ```ClaseDependencia```, la cual aun no está implementada, o se desea aislar de la misma, se la puede configurar de la siguiente manera:
        -Generar una clase ```ClaseMock``` dentro del archivo ```ejemplo.component.spec.ts``` que simule ser la clase de la que depende ```ejemplo.component.ts``` de la siguiente forma:

            class ClaseMock {
                /*Simulacion de funcionalidades*/
            }

        -Configurar para que ```ClaseMock``` sustituya la funcionalidad de ClaseDependencia
        beforeEach(() => {
             TestBed.configureTestingModule({
                providers: [
                   WelcomeComponent,
                   { provide: UserService, useClass: MockUserService }
                ]
             });
             comp = TestBed.inject(WelcomeComponent);
             userService = TestBed.inject(UserService);
        });

Los tests son ejecutados de las siguientes formas:
    -Manualmente pueden ejecutarse todos mediante ```ng test``` Esto abrira un browser, y correrá todos los tests de todos los componentes
    -Individualmente cada test puede ser ejecutado con ```ng test --main ./path/to/ejemplo.component.spec.ts ```
    -Alternativamente todos los test son ejecutados al llevar a cabo un push. Si uno de los test no es exitoso, el push no se lleva a cabo