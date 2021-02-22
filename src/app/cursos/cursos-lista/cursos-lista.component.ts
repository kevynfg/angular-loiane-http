import { Component, OnInit } from '@angular/core';

import { empty, Observable, of, Subject } from 'rxjs';
import { CursosService } from '../cursos.service';
import { Curso } from './../curso';
import { catchError } from 'rxjs/operators';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalServiceService } from 'src/app/shared/alert-modal-service.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  bsModalRef!: BsModalRef;
  // cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    private alertService: AlertModalServiceService
  ) {}

  ngOnInit(): void {
    // this.service.list().subscribe((dados) => this.cursos = dados);
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );

    // this.service.list().subscribe(
    //   dados => {
    //     console.log(dados)
    //   }, error => console.error(error),
    //   () => console.log('Observable completo!')
    // )
  }

  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde.'
    );
  }
}
