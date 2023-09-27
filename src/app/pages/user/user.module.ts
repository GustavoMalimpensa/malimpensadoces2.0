import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModule } from '../../bootstrap.module' ; 
import { UserComponent } from './user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarrinhoService } from '../../services/carrinho.service';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    ProductsComponent
  ],
  imports: [
    BootstrapModule,
    ModalModule.forRoot(),
    BrowserModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AlertModule.forRoot(),
    RouterModule.forChild([
      // Defina as rotas específicas do User aqui
      { path: '', component: UserComponent }, // Exemplo de rota para a página principal do User
    ]),
    SharedModule
  ],
  providers: [CarrinhoService]
})
export class UserModule { }
