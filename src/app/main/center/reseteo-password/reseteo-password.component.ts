import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CoreConfigService } from '../../../../@core/services/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RecuperarPassService } from '../recuperar-pass/recuperar-pass.service';
import { Subject } from 'rxjs';
import { ReseteoPasswordService } from './reseteo-password.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reseteo-password',
  templateUrl: './reseteo-password.component.html',
  styleUrls: ['./reseteo-password.component.scss']
})
export class ReseteoPasswordComponent implements OnInit {
  @ViewChild('mensajeModalConfirm') mensajeModalConfirm;

  // Public
  public emailVar;
  public coreConfig: any;
  public forgotPasswordForm: FormGroup;
  public submitted = false;
  public data;
  public error;
  public passwordTextType: boolean;
  public confirmPasswordTextType: boolean;
  public passwordSimilar: boolean;
  public token;
  public mensaje = "";
  public email;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   *
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _reseteoPasswordService: ReseteoPasswordService,
    private _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal,

  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    this._activatedRoute.queryParams.subscribe(params => {
      this.token = params.token;
      this.email = params.email;
    });

    this.forgotPasswordForm = this._formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  toggleConfirmPasswordTextType() {
    this.confirmPasswordTextType = !this.confirmPasswordTextType;
  }

  /**
   * On destroy
   */

  resetearPassword() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid || !this.passwordSimilar) {
      return;
    }
    this._reseteoPasswordService.resetearPassword(
      {
        password: this.f.password.value,
        token: this.token,
        email: this.email
      }
    ).subscribe((info) => {
      this.error = null;
      if (info.status) {
        this.mensaje = "Contraseña actualizada correctamente, haga click en continuar para ir a la página de inicio";
        this.abrirModal(this.mensajeModalConfirm);
      }
    },
      (error) => {
        this.error = ["Verifique si su contraseña es correcta"];
        // console.log(error);
        // this.error = error.error.password;
      });
  }
  redirigir() {
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }
  compararPassword() {
    if (this.f.password.value == this.f.confirmPassword.value) {
      this.passwordSimilar = true;
    } else {
      this.passwordSimilar = false;
    }
  }
  abrirModal(modal) {
    this._modalService.open(modal);
  }
  cerrarModal() {
    this._modalService.dismissAll();
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
