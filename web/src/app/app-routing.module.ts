import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { UserModule } from './pages/user/user.module';
import { OrderComponent } from './pages/order/order.component';
import { OrderModule } from './pages/order/order.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
    { path: 'user', component: UserComponent, title:'Cátalogo' },
    { path: 'pedido', component: OrderComponent, title:'Pedido' },
    { path: '', redirectTo: '/user', pathMatch: 'full' }, // Redirecionar para /user por padrão
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes),
      UserModule, 
      OrderModule,
      SharedModule
    ],
  exports: [RouterModule],
  declarations: [],  
})

export class AppRoutingModule { }