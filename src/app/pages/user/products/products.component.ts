import { Component, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CarrinhoService } from '../../../services/carrinho.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { allProducts } from 'src/app/data/products-data';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {

  categories: string[] = ['bolo_pote', 'cone_trufado', 'bolo', 'pudim'];
  filteredProducts: Product[] = [];
  selectedCategory: string = '*';
  precoTotal: number = 0;
  itenTotal: number = 0;
  cancelarClicado: boolean = false;
  carrinho: any[] = [];
  modalRef?: BsModalRef;
  title: string = '';
  produtoDetalhado: any;
  quantidadeSelecionada: number = 1;
  showSearchBar: boolean = false;

  products: Product[] = allProducts;

  constructor(
    private modalService: BsModalService,
    private carrinhoService: CarrinhoService,
    private router: Router,
  ) {
    this.carrinho = []; 
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  filterProducts(category: string) {
    this.selectedCategory = category;
    this.filteredProducts = category === '*' ?
      this.products :
      this.products.filter(product => product.category === category);
  }

  //filtrar por pesquisa

  loadProducts() {
    this.filteredProducts = this.products;
  }

  //modal para detalhes do produto

  abrirModalDetalhesProduto(product: any) {
    this.produtoDetalhado = product;
    this.modalRef = this.modalService.show(this.modalDetalhesProduto);
  }
  
  fecharModalDetalhesProduto() {
    this.modalRef?.hide();
  }

  adicionarAoCarrinho(produto: Product) {
    console.log('Adicionando produto ao carrinho:', produto);
    const itemNoCarrinho = this.getCarrinhoItem(produto);
  
    if (itemNoCarrinho) {
      // Se o produto já estiver no carrinho, atualize a quantidade com base na quantidade selecionada
      itemNoCarrinho.quantidade += this.quantidadeSelecionada;
    } else {
      // Se o produto não estiver no carrinho, crie um novo item no carrinho com a quantidade selecionada
      produto.quantidade = this.quantidadeSelecionada;
      this.carrinho.push(produto);
    }
  
    // Limpe a quantidade selecionada
    this.quantidadeSelecionada = 1;
  
    // Feche o modal após adicionar ao carrinho
    this.modalRef?.hide();
  
    // Atualize o preço total do carrinho
    this.itenTotal = this.calcularItenTotal();
    this.precoTotal = this.calcularPrecoTotal();
    this.carrinhoService.adicionarProdutoAoCarrinho(produto);
  }

  aumentarQuantidade() {
    this.quantidadeSelecionada++;
    console.log('Quantidade selecionada aumentada para', this.quantidadeSelecionada);
  }

  diminuirQuantidade() {
    if (this.quantidadeSelecionada > 1) {
      this.quantidadeSelecionada--;
      console.log('Quantidade selecionada diminuída para', this.quantidadeSelecionada);
    }
  }

  //modal finalizar compra
  
  openModal(buttonNumber: number) {
    this.cancelarClicado = false;
    this.modalRef = this.modalService.show(this.modalTemplate);
  }
  
  
  removerDoCarrinho(item: any) {
    if (item.quantidade === 1) {
      const index = this.carrinho.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        this.carrinho.splice(index, 1);
      }
    } else {
      item.quantidade--;
    }
  
    this.itenTotal = this.calcularItenTotal();
    this.precoTotal = this.calcularPrecoTotal();
  }

  limparCarrinho() {
    this.carrinho = [];
  }
  
  calcularItenTotal(): number {
    return this.carrinho.reduce((total, item) => total + item.quantidade, 0);
  }

  calcularPrecoTotal(): number {
    return this.carrinho.reduce((total, item) => total + item.price * item.quantidade, 0);
  }

  getCarrinhoItem(product: Product) {
    return this.carrinho.find((item) => item.id === product.id);
  }

  estaNoCarrinho(product: Product): boolean {
    return this.carrinho.some((item) => item.id === product.id);
  }

  finalizarCompra() {
    this.modalRef?.hide();
    this.router.navigate(['/pedido'], { queryParams: { from: 'home' } });
  }
  
  
  @ViewChild('modalTemplate') modalTemplate!: string;

  @ViewChild('modalDetalhesProduto') modalDetalhesProduto!: string;

}













  