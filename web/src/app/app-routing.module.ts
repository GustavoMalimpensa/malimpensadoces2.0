import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { UserModule } from './pages/user/user.module';
import { OrderComponent } from './pages/order/order.component';
import { OrderModule } from './pages/order/order.module';
import { SharedModule } from './shared/shared.module';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminModule } from './pages/admin/admin.module';

const routes: Routes = [
    { path: 'Catalogo', component: UserComponent, title:'Cátalogo' },
    { path: 'Pedido', component: OrderComponent, title:'Pedido' },
    { path: 'admin', component: AdminComponent, title:'Admin' },
    { path: '', redirectTo: '/user', pathMatch: 'full' }, // Redirecionar para /user por padrão
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes),
      UserModule, 
      OrderModule,
      SharedModule,
      AdminModule
    ],
  exports: [RouterModule],
})

export class AppRoutingModule { }