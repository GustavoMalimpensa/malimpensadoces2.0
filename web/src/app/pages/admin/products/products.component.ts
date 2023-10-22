import { Component, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {

  private apiUrl = 'http://localhost:3000'; // Substitua pelo URL base da sua API


  categories: string[] = ['bolo_pote', 'cone_trufado', 'bolo', 'pudim'];
  filteredProducts:  any[] = [];
  allProducts: any[] = []; 
  selectedCategory: string = '*';
  cancelarClicado: boolean = false;
  modalRef?: BsModalRef;
  title: string = '';
  produtoDetalhado: any;
  successMessage: string = '';
  errorMessage: string = '';
  productToDeleteId: number | undefined;
  showDeleteConfirmationModal = false;

  newProduct: any = {
    category: '',
    name: '',
    content: '',
    price: '',
    file: '',
    user_id: '1',
  };

  constructor(
    private modalService: BsModalService,
    private ProductService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  filterProducts(category: string) {
    // Filtrar produtos com base na categoria selecionada
    this.filteredProducts = this.allProducts.filter((product) => product.category === category);
    this.selectedCategory = category;
    if (category === '*') {
      // Se a categoria for '*' (Todos), não aplique nenhum filtro
      this.filteredProducts = this.allProducts;
    } else {
      // Caso contrário, filtre os produtos com base na categoria selecionada
      this.filteredProducts = this.allProducts.filter(product => product.category === category);
    }
  }

  //Carregando produtos

  loadProducts() {
    this.ProductService.getAllProducts().subscribe((products) => {
      this.allProducts = products as any[]; // Forçar a tipagem para um array
      // Inicialmente, exiba todos os produtos
      this.filteredProducts = this.allProducts;
    });
  }

  //Adicionar Produto

  addProduct() {
    // Certifique-se de que this.newProduct contém as informações do produto
    this.ProductService.addProducts(this.newProduct).subscribe(
      () => {
        console.log('Produto adicionado com sucesso.');
        this.successMessage = 'Produto cadastrado com sucesso!';
        this.errorMessage = ''; // Limpar a mensagem de erro, se houver
        this.newProduct = {}; // Limpar o objeto newProduct
        this.loadProducts(); // Recarregar a lista de produtos
      },
      (error) => {
        console.error('Erro ao adicionar produto:', error);
        this.successMessage = ''; // Limpar a mensagem de sucesso, se houver
        this.errorMessage = 'Falha ao cadastrar o produto.';
      }
    );
  }
  
  // Modal adicionar produto 

  adicionarProduto(buttonNumber: number) {
    this.cancelarClicado = false;
    this.modalRef = this.modalService.show(this.modalAdicionarProduct);
  }

  fecharModalAdicionarProduto() {
    this.modalRef?.hide();
  }

  //modal para editar o produto

  abrirmodalEditarProduto(product: any) {
    this.produtoDetalhado = product;
    this.modalRef = this.modalService.show(this.modalEditarProduto);
  }
  
  fecharModalDetalhesProduto() {
    this.modalRef?.hide();
  }

  //modal confirmar deletar produto

  confirmarDeletarProduto(buttonNumber: number) {
    this.title = `Excluir Produto?`;
    this.modalRef = this.modalService.show(this.modalDeletarProduto);
  }


  modalDeleteProduct(productId: number) {
    this.productToDeleteId = productId;
    this.showDeleteConfirmationModal = false;
  }

  cancelDelete() {
    this.productToDeleteId = undefined; // Limpar o ID do produto a ser excluído
    this.showDeleteConfirmationModal = false; // Fechar o modal
  }


  deleteProduct(productId: number) {
    this.ProductService.deleteProducts(productId).subscribe(
      () => {
        console.log('Produto excluído com sucesso.');
        this.loadProducts(); // Recarregar a lista de produtos após a exclusão
        this.showDeleteConfirmationModal = false; // Fechar o modal após a exclusão
        this.successMessage = 'Produto excluído com sucesso!';
        this.errorMessage = ''; // Limpar a mensagem de erro, se houver
      },
      (error) => {
        console.error('Erro ao excluir produto:', error);
        this.showDeleteConfirmationModal = false; // Fechar o modal em caso de erro
        this.successMessage = ''; // Limpar a mensagem de sucesso, se houver
        this.errorMessage = 'Falha ao excluir o produto.';
      }
    );
    this.productToDeleteId = productId;
    this.showDeleteConfirmationModal = true;
  }

  updateImagePreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProduct.file = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  @ViewChild('modalAdicionarProduct') modalAdicionarProduct!: string;

  @ViewChild('modalEditarProduto') modalEditarProduto!: string;

  @ViewChild('modalDeletarProduto') modalDeletarProduto!: string;

}