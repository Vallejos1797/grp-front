import { CoreMenu } from '@core/types'
import { Role } from '../auth/models/role';

export const menu: CoreMenu[] = [
  {
    id: 'inicio',
    title: 'Inicio',
    // translate: 'MENU.HOME',
    role: [Role.SuperMonedas],
    type: 'item',
    icon: 'home',
    url: 'personas/inicio',

  },
  {
    id: 'que-es',
    title: '¿Qué es super monedas?',
    // translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'info',
    url: 'personas/que-es'
  },
  {
    id: 'apps',
    type: 'section',
    title: 'Administración',
    role: [Role.SuperMonedas],
    // translate: 'MENU.APPS.SECTION',
    icon: 'package',
    children: [
      {
        id: 'superMonedas',
        title: 'Super monedas',
        role: [Role.SuperMonedas],
        // translate: 'MENU.PAGES.SECTION',
        type: 'collapsible',
        icon: 'dollar-sign',
        children: [
          {
            id: 'misSuperMonedas',
            title: 'Mis super monedas',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          },
          {
            id: 'cargarMisFacturas',
            title: 'Cargar mis facturas',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-facturas'
          },
          {
            id: 'calificarCompras',
            title: 'Calificar compras',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-calificaciones'
          },
          {
            id: 'compartirPublicaciones',
            title: 'Compartir publicaciones',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/compartir-publicaciones'
          },
          {
            id: 'monedasOtorgadas',
            title: 'Monedas por compras en locales afiliados',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/monedas-otorgadas'
          },
          {
            id: 'pagarSupermonedas',
            title: 'Pagar con super monedas',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/pagar-con-supermonedas'
          }
        ]
      },
      {
        id: 'creditosAutonomos',
        title: 'Créditos para Autónomos',
        role: [Role.SuperMonedas],
        // translate: 'MENU.PAGES.SECTION',
        type: 'collapsible',
        icon: 'credit-card',
        children: [
          {
            id: 'solicitarCreditoAut',
            title: 'Solicitar crédito',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/creditos-autonomos/solicitar-credito'
          },
        ]
      },
      {
        id: 'creditosEmpleado',
        title: 'Empleado',
        role: [Role.SuperMonedas],
        // translate: 'MENU.PAGES.SECTION',
        type: 'collapsible',
        icon: 'credit-card',
        children: [
          {
            id: 'creditosPreEmp',
            title: 'Créditos preaprobados',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/creditos-empleados/creditos-pre-aprobados'
          }
        ]
      },
      {
        id: 'creditosPreAprobados',
        title: 'Créditos Pre Aprobados',
        role: [Role.SuperMonedas],
        // translate: 'MENU.PAGES.SECTION',
        type: 'collapsible',
        icon: 'credit-card',
        children: [
          {
            id: 'listadoCreditosPre',
            title: 'Listado de créditos Pre Aprobados',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/creditos-pre-aprobados/listado'
          }
        ]
      },
      {
        id: 'misCreditos',
        title: 'Mis créditos',
        role: [Role.SuperMonedas],
        // translate: 'MENU.PAGES.SECTION',
        type: 'collapsible',
        icon: 'credit-card',
      },
      {
        id: 'reclamosRequerimientos',
        title: 'Reclamos y Requerimientos',
        role: [Role.SuperMonedas],
        // translate: 'MENU.PAGES.SECTION',
        type: 'item',
        icon: 'message-circle',
        url: 'personas/inicio',
      },

    ]
  },

]
