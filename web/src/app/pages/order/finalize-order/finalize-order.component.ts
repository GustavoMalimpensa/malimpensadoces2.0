import { Component, OnInit  } from '@angular/core';
import { CarrinhoService } from '../../../services/carrinho.service';

@Component({
  selector: 'app-finalize-order',
  templateUrl: './finalize-order.component.html',
  styleUrls: ['./finalize-order.component.css']
})
export class FinalizeOrderComponent implements OnInit {

  metodoEntregaOpcao: string = 'entregar'; 
  metodoPagamento: string = 'pix';
  metodoEntrega: string = 'retirar';
  enderecoEntrega: string = '';
  numeroLoja: string = '+5519998133186';
  produtosDoCarrinho: any[] = []; 
  tipoEntrega: string = ''; 
  Horario: string = '';
  editandoHorario: boolean = false;
  horarioPersonalizado: string = '';
  totalCompra: number = 0;
  valorEntrega: number = 0; 
  logoImagePath = './assets/img/logo.mini.png'; 

  constructor(private carrinhoService: CarrinhoService ) {
   
  }

  ngOnInit() {
    // Obtenha os produtos do carrinho usando o serviço
    this.produtosDoCarrinho = this.carrinhoService.obterProdutosDoCarrinho();
  }

  toggleEndereco() {
    if (this.tipoEntrega === 'entregar') {
      // Se a opção "Entrega no Endereço" estiver selecionada, mostre o campo de endereço
      return true;
    }
    // Caso contrário, oculte o campo de endereço
    return false;
  }

  calcularPrecoTotal(): number {
    let total = 0;
    for (const item of this.produtosDoCarrinho) {
      total += item.price * item.quantidade;
    }
    return total;
  }

  calcularPrecoTotalFinal(): number {
    let total = 0;

    for (const item of this.produtosDoCarrinho) {
      total += item.price * item.quantidade;
    }

    // Se a opção de entrega for "entregar", adicione o valor da entrega
    if (this.tipoEntrega === 'entregar') {
      total += this.valorEntrega;
    }

    return total;
  }


  // Função para formatar a hora
  formatHorario(date: Date): string {
    const hours = this.padZeroes(date.getHours());
    const minutes = this.padZeroes(date.getMinutes());

    return `${hours}:${minutes}`;
  }

  // Função auxiliar para adicionar zeros à esquerda
  padZeroes(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  // Função para habilitar a edição do horário personalizado
  editarHorario() {
    this.editandoHorario = true;
  }

  concluirCompra() {
    if (this.produtosDoCarrinho.length === 0) { 
      return;
    }
  
    let valorEntregaTexto = '';
    let enderecoEntregaTexto = '';
  
    if (this.tipoEntrega === 'entregar') {
      this.valorEntrega = 10; // Define o valor da entrega como R$10,00 quando "Entregar pedido" é selecionado
      valorEntregaTexto = `Taxa de entrega: R$${this.valorEntrega.toFixed(2)}`;
      enderecoEntregaTexto = `Endereço de Entrega: ${this.enderecoEntrega}`;
    } else {
      this.valorEntrega = 0; // Define o valor da entrega como 0 quando "Retirar pedido" é selecionado
      enderecoEntregaTexto = 'Retirar no local';
    }
  
    const totalCompra = this.calcularPrecoTotal();
  
    const itensPedido = this.produtosDoCarrinho.map(item => `${item.quantidade}x ${item.name} - R$${(item.price * item.quantidade).toFixed(2)}`).join(' | ');
  
    const mensagem =
      `Olá, gostaria de realizar um pedido!\n\n` +
      `${itensPedido}\n\n` +
      `Ficando : R$${totalCompra.toFixed(2)} + \n` +
      `${valorEntregaTexto}\n` +
      ` ------------\n` +
      `Método de pagamento vai ser: ${this.metodoPagamento} \n` +
      `Método de entrega: ${this.tipoEntrega === 'entregar' ? 'Entrega' : 'Retirar no local'}. ${enderecoEntregaTexto}, as ${this.Horario} horas. \n\n` +
      ` Aguardo seu retorno!`;
  
    const linkWhatsApp = `https://wa.me/${this.numeroLoja}?text=${encodeURIComponent(mensagem)}`;
  
    window.open(linkWhatsApp, '_blank');
  }
  
  
  

}
