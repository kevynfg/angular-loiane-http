import { Component, OnInit, ViewChild } from '@angular/core';

import { EMPTY, empty, Observable, of, pipe, Subject } from 'rxjs';
import { CursosService } from '../cursos.service';
import { Curso } from './../curso';
import { catchError, switchMap, take } from 'rxjs/operators';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  bsModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  selectedCurso: Curso;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  deleteModalRef: BsModalRef;

  constructor(
    private service: Cursos2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
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
        return EMPTY;
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

  // tslint:disable-next-line: typedef
  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso: any) {
    this.selectedCurso = curso;

    // this.deleteModalRef = this.modalService.show(this.deleteModal, {
    //   class: 'modal-sm',
    // });

    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover este curso?',
      'Sim',
      'Não'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        // tslint:disable-next-line: deprecation
        switchMap((result) => (result ? this.service.remove(curso.id) : EMPTY))
      )
      .subscribe(
        (success) => {
          this.onRefresh();
        },
        (error) => {
          this.alertService.showAlertDanger(
            'Erro ao remover curso. Tente novamente mais tade.'
          );
        }
      );
  }

  onConfirmDelete() {
    this.service.remove(this.selectedCurso.id).subscribe(
      (success) => {
        this.onRefresh();
        this.modalService.hide();
      },
      (error) => {
        this.alertService.showAlertDanger(
          'Erro ao remover curso. Tente novamente mais tade.'
        );
        this.modalService.hide();
      }
    );
  }

  onDeclineDelete() {
    this.modalService.hide();
  }
}
