import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { BienvenidoService } from '../../bienvenido/bienvenido.service';
import { takeUntil } from 'rxjs/operators';
import { CreditosPreAprobadosService } from '../creditos-empleados.service';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { CoreConfigService } from '../../../../../../@core/services/config.service';
import { CoreMenuService } from '../../../../../../@core/components/core-menu/core-menu.service';
import { CompletarPerfil, SolicitarCredito, InformacionCompleta } from '../../../models/persona';
import moment from 'moment';
import { User } from '../../../../../auth/models/user';
import { CreditosAutonomosService } from '../../creditos-autonomos/creditos-autonomos.service';
import { DatePipe } from '@angular/common';
import { ParametrizacionesService } from '../../../servicios/parametrizaciones.service';

@Component({
  selector: 'app-creditos-pre-aprobados-emp',
  templateUrl: './creditos-pre-aprobados-emp.component.html',
  styleUrls: ['./creditos-pre-aprobados-emp.component.scss'],
  providers: [DatePipe]

})
export class CreditosPreAprobadosEmpComponent implements OnInit {
  @ViewChild('establecimientoSeleccionadoMdl') establecimientoSeleccionadoMdl;
  @ViewChild('datosContactoMdl') datosContactoMdl;
  @ViewChild('startDatePicker') startDatePicker;
  @ViewChild('whatsapp') whatsapp;
  @ViewChild(NgbPagination) paginator: NgbPagination;
  public page = 1;
  public page_size: any = 10;
  public maxSize;
  public collectionSize;
  public error;
  public informacion: CompletarPerfil;
  public informacionBasica: InformacionCompleta;
  public submittedPersona = false;
  public coreConfig: any;
  public personaForm: FormGroup;
  public datosContactoForm: FormGroup;
  public imagen;
  public registerForm: FormGroup;
  public loading = false;
  public submitted = false;
  public usuario: User;
  public idEmpresa = "";
  public listaCreditos;
  public listaConvenios;
  public idCredito = "";
  public idEmpresaFinanciera = "";
  public idEmpresaComercial = "";
  public proceso = 1;
  public solicitarCredito: SolicitarCredito;
  public startDateOptions: FlatpickrOptions = {
    altInput: true,
    mode: 'single',
    altFormat: 'Y-n-j',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
  };
  public codigo;
  public fecha;
  public paisOpciones;
  public provinciaOpciones;
  public ciudadOpciones;
  public tipoGeneroOpciones;
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
    private _creditosPreAprobadosService: CreditosPreAprobadosService,
    private _creditosAutonomosService: CreditosAutonomosService,
    private datePipe: DatePipe,
    private paramService: ParametrizacionesService,

    private _bienvenidoService: BienvenidoService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private changeDetector: ChangeDetectorRef,

  ) {
    this.informacionBasica = this.inicializarInformacion();

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
    this.solicitarCredito = this.inicialidarSolicitudCredito();
    this._unsubscribeAll = new Subject();

  }
  inicializarInformacion() {
    return {
      created_at: "",
      identificacion: "",
      nombres: "",
      apellidos: "",
      genero: "",
      direccion: "",
      fechaNacimiento: "",
      edad: 0,
      ciudad: "",
      provincia: "",
      pais: "",
      email: "",
      emailAdicional: "",
      telefono: "",
      whatsapp: "",
      facebook: "",
      instagram: "",
      twitter: "",
      tiktok: "",
      youtube: "",
    }
  }
  inicialidarSolicitudCredito(): SolicitarCredito {
    return {
      _id: "",
      aceptaTerminos: 0,
      empresaComercial_id: "",
      empresaIfis_id: "",
      estado: "",
      monto: 0,
      plazo: 0,
      user_id: ""
    }
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  get persForm() {
    return this.personaForm.controls;
  }
  get datosContForm() {
    return this.datosContactoForm.controls;
  }
  /**
   * On init
   */
  ngOnInit(): void {

    this.usuario = this._coreMenuService.grpPersonasUser;

    this.personaForm = this._formBuilder.group({
      identificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      edad: [0, Validators.required],
    });
    this.datosContactoForm = this._formBuilder.group({
      pais: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      whatsapp: ['', [Validators.required]],
    });
    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });

  }
  ngAfterViewInit(): void {
    this._creditosAutonomosService.obtenerInformacion(this.usuario.id).subscribe((info) => {
      // console.log(info);
      this.informacionBasica = info;
      this.informacionBasica.created_at = this.transformarFecha(info.created_at);
      this.fecha = this.transformarFecha(info.fechaNacimiento);
      this.obtenerPaisOpciones();
      this.obtenerProvinciaOpciones();
      this.obtenerCiudadOpciones();
    });
    this.obtenerGeneroOpciones();
    this.obtenerListaCreditos();

  }
  transformarFecha(fecha) {
    let nuevaFecha = this.datePipe.transform(fecha, 'yyyy-MM-dd');
    return nuevaFecha;
  }
  obtenerPaisOpciones() {
    this.paramService.obtenerListaPadres("PAIS").subscribe((info) => {
      this.paisOpciones = info;
    });
  }
  obtenerGeneroOpciones() {
    this.paramService.obtenerListaPadres("GENERO").subscribe((info) => {
      this.tipoGeneroOpciones = info;
    });
  }
  obtenerProvinciaOpciones() {
    this.paramService.obtenerListaHijos(this.informacionBasica.pais, "PAIS").subscribe((info) => {
      this.provinciaOpciones = info;
    });
  }
  obtenerCiudadOpciones() {
    this.paramService.obtenerListaHijos(this.informacionBasica.provincia, "PROVINCIA").subscribe((info) => {
      this.ciudadOpciones = info;
    });
  }

  iniciarPaginador() {
    this.paginator.pageChange.subscribe(() => {
      this.obtenerListaCreditos();
    });
  }
  obtenerListaCreditos() {
    this._creditosPreAprobadosService.obtenerListaCreditos({
      page: this.page - 1,
      page_size: this.page_size,
      tipoPersona: "Empleados",
      user_id: this.usuario.id
    }).subscribe((info) => {
      this.listaCreditos = info.info;
      this.collectionSize = info.cont;
    })
  }
  subirImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      let nuevaImagen = event.target.files[0];

      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.imagen = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      let imagen = new FormData();
      imagen.append('imagen', nuevaImagen, nuevaImagen.name);

    }
  }
  calcularEdad() {
    this.informacionBasica.edad = moment().diff(this.persForm.fechaNacimiento.value[0], 'years');
    this.informacionBasica.fechaNacimiento = moment(this.persForm.fechaNacimiento.value[0]).format('YYYY-MM-DD');
  }
  continuar() {
    this.submittedPersona = true;
    // stop here if form is invalid
    if (this.datosContactoForm.invalid) {
      return;
    }
    if (this.personaForm.invalid) {
      return;
    }
    this._creditosAutonomosService.guardarInformacion({ ...this.informacionBasica, user_id: this.usuario.id, imagen: [] })
      .subscribe((info) => {
        this._creditosPreAprobadosService.actualizarCredito({
          id:this.idCredito,
          estado: "Confirmado",
          empresa_financiera: this.idEmpresaFinanciera,
          empresa_comercial: this.idEmpresaComercial
        }).subscribe(() => {
          this.cerrarModal();
        })
      });
  }
  verEmpresas(id, empresa) {
    this.idCredito = id;
    this.idEmpresaFinanciera = empresa;
    this._creditosPreAprobadosService.obtenerListaConvenios({ empresa }).subscribe((info) => {
      this.listaConvenios = info.info;
      
    });
    this.abrirModalLg(this.establecimientoSeleccionadoMdl);
  }
  obtenerEmpresaComercial(idEmpresaComercial) {
    this.idEmpresaComercial = idEmpresaComercial;
    this.changeDetector.detectChanges();
    this.abrirModalLg(this.datosContactoMdl);
    this.changeDetector.detectChanges();
  }
  obtenerIdIfi(value) {
    this.solicitarCredito.empresaIfis_id = value;
  }
  obtenerEstablecimiento(value) {
    this.solicitarCredito.empresaComercial_id = value;
    this.idEmpresa = value;
    this.changeDetector.detectChanges();
  }
  obtenerMonto(value) {
    this.solicitarCredito.plazo = value.plazo;
    this.solicitarCredito.monto = value.monto;
    this.solicitarCredito.aceptaTerminos = value.aceptaTerminos ? 1 : 0;
  }
  abrirModalLg(modal) {
    this.modalService.open(modal, {
      size: 'lg'
    });
    this.changeDetector.detectChanges();
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
