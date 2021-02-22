import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal-service.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // this.route.params.subscribe((params: any) => {
    //   const id = params.id;
    //   console.log(id);
    //   const curso$ = this.service.loadById(id);
    //   curso$.subscribe((curso: any) => {
    //     // teste para verificar que o form inicializa NULL
    //     registro = curso;
    //     this.updateForm(curso);
    //   });
    // });

    this.route.params
      .pipe(
        map((params: any) => params.id),
        switchMap((id) => this.service.loadById(id))
      )
      .subscribe((curso: any) => this.updateForm(curso));

    this.form = this.formBuilder.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  // tslint:disable-next-line: typedef
  updateForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome,
    });
  }

  hasError(field: string) {
    // tslint:disable-next-line: no-unused-expression
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log('Form enviado.');
      this.service.create(this.form.value).subscribe(
        (success) => {
          this.modal.showAlertSuccess('Criado com sucesso!');
          // Volta para a rota anterior antes de chegar nesta rota
          this.location.back();
        },
        (error) => this.modal.showAlertDanger('Erro ao completar o registro.'),
        () => console.log('Request completo!')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    console.log('Formulário resetado, submitted = false');
  }
}
