import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ContentHeaderModule } from '../../layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { CoreCommonModule } from '../../../@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CoreTouchspinModule } from '../../../@core/components/core-touchspin/core-touchspin.module';
import { CoreSidebarModule } from '../../../@core/components/core-sidebar/core-sidebar.module';
import { RecuperarPassComponent } from './recuperar-pass/recuperar-pass.component';
import { RegistroComponent } from './registro/registro.component';

const routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'auth' }
  },
  {
    path: 'registro',
    component: RegistroComponent,
    data: { animation: 'auth' }
  },
  {
    path: 'recuperar-pass',
    component: RecuperarPassComponent,
    data: { animation: 'auth' } 
  }
];

@NgModule({
  declarations: [LoginComponent,RecuperarPassComponent, RegistroComponent],
  imports: [
    RouterModule.forChild(routes), 
    ContentHeaderModule, 
    TranslateModule, 
    CoreCommonModule, 
    SwiperModule,
    FormsModule,
    CoreTouchspinModule,
    CoreSidebarModule,
    NgbModule,
  ]
})
export class CenterModule { }
