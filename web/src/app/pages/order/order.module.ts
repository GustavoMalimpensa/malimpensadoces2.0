import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalizeOrderComponent } from './finalize-order/finalize-order.component';
import { OrderComponent } from './order.component';
import { CarrinhoService } from '../../services/carrinho.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    FinalizeOrderComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  providers: [CarrinhoService]
})
export class OrderModule { }
