import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletarPerfilComponent } from './vistas/completar-perfil/completar-perfil.component';
import { FelicidadesRegistroComponent } from './vistas/felicidades-registro/felicidades-registro.component';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { QueEsComponent } from './vistas/que-es/que-es.component';
import { MisMonedasComponent } from './vistas/supermonedas/mis-monedas/mis-monedas.component';
import { MisFacturasComponent } from './vistas/supermonedas/mis-facturas/mis-facturas.component';
import { MisCalificacionesComponent } from './vistas/supermonedas/mis-calificaciones/mis-calificaciones.component';
import { CompartirPublicacionesComponent } from './vistas/supermonedas/compartir-publicaciones/compartir-publicaciones.component';
import { MonedasOtorgadasComponent } from './vistas/supermonedas/monedas-otorgadas/monedas-otorgadas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { RouterModule } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FormsModule } from '@angular/forms';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { CoreSidebarModule } from '@core/components';
import { AuthGuard } from '../../auth/helpers/auth.guards';
import { Role } from '../../auth/models/role';
import { BienvenidoComponent } from './vistas/bienvenido/bienvenido.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CardSnippetModule } from '../../../@core/components/card-snippet/card-snippet.module';
import { PerfilUsuarioComponent } from '../center/perfil-usuario/perfil-usuario.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { PagarConSuperMonedasComponent } from './vistas/supermonedas/pagar-con-supermonedas/pagar-con-supermonedas.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { QRCodeModule } from 'angularx-qrcode';
import {NgxPrintModule} from 'ngx-print';
import { CreditosAutonomosComponent } from './vistas/creditos-autonomos/creditos-autonomos.component';
import { VideoExplicativoAutComponent } from './vistas/creditos-autonomos/video-explicativo/video-explicativo.component';
import { PerfilPersonaAutComponent } from './vistas/creditos-autonomos/perfil-persona/perfil-persona.component';
import { EstablecimientosComercialesAutComponent } from './vistas/creditos-autonomos/establecimientos-comerciales/establecimientos-comerciales.component';
import { EstablecimientoSeleccionadoAutComponent } from './vistas/creditos-autonomos/establecimiento-seleccionado/establecimiento-seleccionado.component';
import { RucPersonaAutComponent } from './vistas/creditos-autonomos/ruc-persona/ruc-persona.component';
import { ResultadosCreditoAutComponent } from './vistas/creditos-autonomos/resultados-credito/resultados-credito.component';
import { MensajeResultadoAutComponent } from './vistas/creditos-autonomos/mensaje-resultado/mensaje-resultado.component';
import { ListadoCreditosPreAprobadosComponent } from './vistas/creditos-pre-aprobados/litado-creditos-pre-aprobados/listado-creditos-pre-aprobados.component';
import { CreditosPreAprobadosEmpComponent } from './vistas/creditos-empleados/creditos-pre-aprobados/creditos-pre-aprobados-emp.component';
const routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    component: PrincipalComponent,
    data: { roles: [Role.SuperMonedas] },
    canActivate: [AuthGuard]
    // data: { animation: 'auth' }
  },
  {
    path: 'que-es',
    component: QueEsComponent,
    data: { roles: [Role.SuperMonedas] },
    canActivate: [AuthGuard]
    // data: { animation: 'auth' }
  },
  {
    path: 'supermonedas',
    children: [
      { path: '', redirectTo: 'mis-monedas', pathMatch: 'full' },
      {
        path: 'mis-monedas',
        component: MisMonedasComponent,
        data: { roles: [Role.SuperMonedas] },
        canActivate: [AuthGuard]
        // data: { animation: 'auth' }
      },
      {
        path: 'mis-facturas',
        component: MisFacturasComponent,
        data: { roles: [Role.SuperMonedas] },
        canActivate: [AuthGuard]
        // data: { animation: 'auth' }
      },
      {
        path: 'mis-calificaciones',
        component: MisCalificacionesComponent,
        data: { roles: [Role.SuperMonedas] },
        canActivate: [AuthGuard]
        // data: { animation: 'auth' }
      },
      {
        path: 'mis-calificaciones',
        component: MisCalificacionesComponent,
        data: { roles: [Role.SuperMonedas] },
        canActivate: [AuthGuard]
        // data: { animation: 'auth' }
      },
      {
        path: 'compartir-publicaciones',
        component: CompartirPublicacionesComponent,
        data: { roles: [Role.SuperMonedas] },
        canActivate: [AuthGuard]
        // data: { animation: 'auth' }
      },
      {
        path: 'monedas-otorgadas',
        component: MonedasOtorgadasComponent,
        data: { roles: [Role.SuperMonedas] },
        canActivate: [AuthGuard]
        // data: { animation: 'auth' }
      },
      {
        path: 'pagar-con-supermonedas',
        component: PagarConSuperMonedasComponent,
        data: { roles: [Role.SuperMonedas] },
        canActivate: [AuthGuard]
        // data: { animation: 'auth' }
      },
    ],

  },
  {
    path: 'creditos-autonomos',
    children: [
      { path: '', redirectTo: 'solicitar-credito', pathMatch: 'full' },
      {
        path: 'solicitar-credito',
        component: CreditosAutonomosComponent,
        data: { roles: [Role.SuperMonedas] },
        canActivate: [AuthGuard]
        // data: { animation: 'auth' }
      },]
  },
  {
    path: 'creditos-empleados',
    children: [
      { path: '', redirectTo: 'creditos-pre-aprobados', pathMatch: 'full' },
      {
        path: 'creditos-pre-aprobados',
        component: CreditosPreAprobadosEmpComponent,
        data: { roles: [Role.SuperMonedas] },
        canActivate: [AuthGuard]
        // data: { animation: 'auth' }
      },]
  },
  {
    path: 'creditos-pre-aprobados',
    children: [
      { path: '', redirectTo: 'listado', pathMatch: 'full' },
      {
        path: 'listado',
        component: ListadoCreditosPreAprobadosComponent,
        data: { roles: [Role.SuperMonedas] },
        canActivate: [AuthGuard]
        // data: { animation: 'auth' }
      },]
  },
  {
    path: 'bienvenido',
    component: BienvenidoComponent,
    data: { activacion: [1] },
    canActivate: [AuthGuard]

    // data: { animation: 'auth' }
  },
  {
    path: 'completarPerfil',
    component: CompletarPerfilComponent,
    data: { activacion: [2, 3], animation: 'flatpickr' },
    canActivate: [AuthGuard]

    // data: { animation: 'auth' }
  },
  {
    path: 'felicidadesRegistro',
    component: FelicidadesRegistroComponent,
    data: { activacion: [4] },
    canActivate: [AuthGuard]

    // data: { animation: 'auth' }
  },


];

@NgModule({
  declarations: [
    BienvenidoComponent,
    CompletarPerfilComponent,
    FelicidadesRegistroComponent,
    PrincipalComponent,
    QueEsComponent,
    MisMonedasComponent,
    MisFacturasComponent,
    MisCalificacionesComponent,
    CompartirPublicacionesComponent,
    MonedasOtorgadasComponent,
    PerfilUsuarioComponent,
    PagarConSuperMonedasComponent,
    CreditosAutonomosComponent,
    VideoExplicativoAutComponent,
    PerfilPersonaAutComponent,
    EstablecimientosComercialesAutComponent,
    EstablecimientoSeleccionadoAutComponent,
    RucPersonaAutComponent,
    ResultadosCreditoAutComponent,
    MensajeResultadoAutComponent,
    ListadoCreditosPreAprobadosComponent,
    CreditosPreAprobadosEmpComponent],
  imports: [
    CoreCommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    SwiperModule,
    FormsModule,
    CoreTouchspinModule,
    CoreSidebarModule,
    NgbModule,
    Ng2FlatpickrModule,
    CardSnippetModule,
    ShareIconsModule,
    ShareButtonsModule,
    NgxBarcodeModule,
    QRCodeModule,
    NgxPrintModule
  ],
  exports: [
    BienvenidoComponent,
    CompletarPerfilComponent,
    FelicidadesRegistroComponent,
    PrincipalComponent,
    QueEsComponent,
    MisMonedasComponent,
    MisFacturasComponent,
    MisCalificacionesComponent,
    CompartirPublicacionesComponent,
    MonedasOtorgadasComponent,
    PagarConSuperMonedasComponent,
    CreditosAutonomosComponent,
    VideoExplicativoAutComponent,
    PerfilPersonaAutComponent,
    EstablecimientosComercialesAutComponent,
    EstablecimientoSeleccionadoAutComponent,
    RucPersonaAutComponent,
    ResultadosCreditoAutComponent,
    MensajeResultadoAutComponent,
    ListadoCreditosPreAprobadosComponent,
    CreditosPreAprobadosEmpComponent]
})
export class PersonasModule { }
