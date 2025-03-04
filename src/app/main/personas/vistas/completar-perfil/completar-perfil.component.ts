import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BienvenidoService } from '../bienvenido/bienvenido.service';
import { takeUntil } from 'rxjs/operators';
import { CompletarPerfilService } from './completar-perfil.service';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { CoreConfigService } from '../../../../../@core/services/config.service';
import { CoreMenuService } from '../../../../../@core/components/core-menu/core-menu.service';
import { CompletarPerfil } from '../../models/persona';
import moment from 'moment';
import { User } from '../../../../auth/models/user';
import { GanarSuperMoneda } from '../../models/supermonedas';
import { ParametrizacionesService } from '../../servicios/parametrizaciones.service';

@Component({
  selector: 'app-completar-perfil',
  templateUrl: './completar-perfil.component.html',
  styleUrls: ['./completar-perfil.component.scss']
})
export class CompletarPerfilComponent implements OnInit {
  @ViewChild('startDatePicker') startDatePicker;
  @ViewChild('whatsapp') whatsapp;
  @ViewChild('mensajeModal') mensajeModal;
  public empresaId = "";

  public error;
  public informacion: CompletarPerfil;
  public coreConfig: any;
  public imagen;
  public superMonedas: GanarSuperMoneda;
  public ganarMonedas;
  public mensaje = "";
  public registerForm: FormGroup;
  public loading = false;
  public submitted = false;
  public usuario: User;
  public startDateOptions: FlatpickrOptions = {
    altInput: true,
    mode: 'single',
    altFormat: 'Y-n-j',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
  };
  public codigo;
  public fecha;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _coreMenuService: CoreMenuService,
    private _completarPerfilService: CompletarPerfilService,
    private _bienvenidoService: BienvenidoService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private paramService: ParametrizacionesService,

  ) {
    this.usuario = this._coreMenuService.grpPersonasUser;
    this.superMonedas = this.inicializarSuperMoneda();

    this.informacion = {
      apellidos: "",
      user_id: "",
      edad: 0,
      fechaNacimiento: "",
      genero: "",
      identificacion: "",
      nombres: "",
      whatsapp: ""
    }
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

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  get f() {
    return this.registerForm.controls;
  }
  inicializarSuperMoneda(): GanarSuperMoneda {
    return {
      credito: 0,
      descripcion: "",
      tipo: "Credito",
      user_id: this.usuario.id,
      empresa_id: this.empresaId
    }
  }
  /**
   * On init
   */
  ngOnInit(): void {
    this.obtenerEmpresaId();

    this.registerForm = this._formBuilder.group({
      identificacion: ['', [Validators.required]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: ['string', Validators.required],
      edad: ['', Validators.required],
      whatsapp: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^[0-9]*$"), Validators.min(1)]],
    });
    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
    this._completarPerfilService.obtenerInformacion(this.usuario.id).subscribe(info => {
      this.fecha = info.fechaNacimiento;
      this.imagen = info.imagen;
      this.registerForm.patchValue({
        identificacion: info.identificacion,
        nombres: info.nombres,
        apellidos: info.apellidos,
        genero: info.genero,
        // fechaNacimiento: [info.fechaNacimiento],
        edad: info.edad,
        whatsapp: info.whatsapp ? info.whatsapp.replace("+593", 0) : 0
      });
    });
    this.paramService.obtenerParametroNombreTipo("monedas_registro", "GANAR_SUPERMONEDAS").subscribe((info) => {
      this.ganarMonedas = info;
      this.superMonedas.credito = this.ganarMonedas.valor;
      this.superMonedas.descripcion = "Gana " + this.ganarMonedas.valor + " supermonedas por completar perfil";
    });
  }
  obtenerEmpresaId() {
    this._bienvenidoService.obtenerEmpresa({
      nombreComercial: "Global Red Pyme"
    }).subscribe((info) => {
      this.superMonedas.empresa_id = info._id;
    }, (error) => {
      this.mensaje = "Ha ocurrido un error al actualizar su imagen";
      this.abrirModal(this.mensajeModal);
    });
  }
  ngAfterViewInit(): void {
    if (this.usuario.estado == "3") {
      this.modalWhatsapp(this.whatsapp);
    }
  }

  subirImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      let nuevaImagen = event.target.files[0];


      let imagen = new FormData();
      imagen.append('imagen', nuevaImagen, nuevaImagen.name);
      this._completarPerfilService.subirImagenRegistro(this.usuario.id, imagen).subscribe((info) => {
        let reader = new FileReader();

        reader.onload = (event: any) => {
          this.imagen = event.target.result;
        };

        reader.readAsDataURL(event.target.files[0]);
        this.mensaje = "Imagen actualizada con éxito";
        this.abrirModal(this.mensajeModal);
      },
        (error) => {
          this.mensaje = "Ha ocurrido un error al actualizar su imagen";
          this.abrirModal(this.mensajeModal);
        });
    }
  }
  calcularEdad() {
    this.informacion.edad = moment().diff(this.f.fechaNacimiento.value[0], 'years');
    this.informacion.fechaNacimiento = moment(this.f.fechaNacimiento.value[0]).format('YYYY-MM-DD');
    this.registerForm.patchValue({
      edad: this.informacion.edad
    });
  }
  guardarRegistro() {
    let wppAux = "";

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.informacion.apellidos = this.f.apellidos.value;
    this.informacion.edad = this.f.edad.value;
    // this.informacion.fechaNacimiento = this.f.fechaNacimiento.value;;
    this.informacion.genero = this.f.genero.value;
    this.informacion.identificacion = this.f.identificacion.value;
    this.informacion.nombres = this.f.nombres.value;
    this.informacion.whatsapp = this.f.whatsapp.value;
    wppAux += "+593" + this.f.whatsapp.value.substring(1, 10);
    this.informacion.whatsapp = wppAux;
    this.informacion.user_id = this.usuario.id;

    this._completarPerfilService.guardarInformacion(this.informacion).subscribe(info => {
      this._bienvenidoService.cambioDeEstado(
        {
          estado: "3",
          id: this.usuario.id
        }
      ).subscribe(infoCambio => {
        this.usuario.estado = "3";
        this.usuario.persona = info;
        localStorage.setItem('grpPersonasUser', JSON.stringify(this.usuario));
        this.modalWhatsapp(this.whatsapp);
      },
        (error) => {
          this.mensaje = "Ha ocurrido un error ";
          this.abrirModal(this.mensajeModal);
        });
    },
      (error) => {
        this.mensaje = "Ha ocurrido un error al guardar la información";
        this.abrirModal(this.mensajeModal);
      });


  }
  modalWhatsapp(modalVC) {
    this.modalService.open(modalVC);
  }
  omitirContinuar() {
    let usuario = this._coreMenuService.grpPersonasUser;
    this._bienvenidoService.cambioDeEstado(
      {
        estado: "6",
        id: usuario.id
      }
    ).subscribe((info) => {
      usuario.estado = "6";
      localStorage.setItem('grpPersonasUser', JSON.stringify(usuario));
      setTimeout(() => {
        this._router.navigate(['/']);
      }, 100);
    });
    // Login
    this.loading = true;

    // redirect to home page
  }
  validarWhatsapp() {
    this._completarPerfilService.validarWhatsapp({
      user_id: this.usuario.id,
      codigo: this.codigo
    }).subscribe(info => {
      if (info.message) {
        this._bienvenidoService.cambioDeEstado(
          {
            estado: "4",
            id: this.usuario.id
          }
        ).subscribe(infoCambio => {
          this._bienvenidoService.guardarSuperMonedas(this.superMonedas).subscribe((infoSM) => { },
            (error) => {
              this.mensaje = "Ha ocurrido un error";
              this.abrirModal(this.mensajeModal);
            });
          this.usuario.estado = "4";
          localStorage.setItem('grpPersonasUser', JSON.stringify(this.usuario));
          this.modalService.dismissAll();
          setTimeout(() => {
            this._router.navigate(['/']);
          }, 100);
        });

      }
    }, error => {
      this.error = "Hay un fallo al tratar de verificar su código, intentelo nuevamente"
    });
  }
  abrirModal(modal) {
    this.modalService.open(modal);
  }
  cerrarModal() {
    this.modalService.dismissAll();
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
