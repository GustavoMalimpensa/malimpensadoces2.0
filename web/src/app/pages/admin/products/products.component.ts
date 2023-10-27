import { Component, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {

  categories: string[] = ['bolo_pote', 'cone_trufado', 'bolo', 'pudim'];
  filteredProducts:  any[] = [];
  allProducts: any[] = []; 
  selectedCategory: string = '*';
  cancelarClicado: boolean = false;
  modalRef?: BsModalRef;
  title: string = '';
  produtoDetalhado: any;
  successMessage: string = ''; // Variável para armazenar a mensagem de sucesso
  errorMessage: string = ''; // Variável para armazenar a mensagem de erro
  productToDeleteId: number | undefined;
  showDeleteConfirmationModal = false;
  newProduct: any = {};
  // Variáveis de controle de edição
  isNameEditing: boolean = false;
  isContentEditing: boolean = false;
  isPriceEditing: boolean = false;

  constructor(
    private modalService: BsModalService,
    private ProductService: ProductService,
    private http : HttpClient
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

  //Ajusta url das imagens

  getImageUrl(imageName: string) {
    // Construa a URL completa da imagem com o prefixo do servidor
    return `${this.ProductService.getImageServerUrl()}/${imageName}`;
  }

  //Adicionar Produto

  addProduct() {

    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('category', this.newProduct.category);
    formData.append('content', this.newProduct.content);
    formData.append('price', this.newProduct.price.toString());
    formData.append('user_id', '1');
    formData.append('file', this.newProduct.file); 

    this.ProductService.addProducts(formData).subscribe({
    next: () => {
      console.log('Produto adicionado com sucesso.');
      this.successMessage = 'Produto cadastrado com sucesso!';
      this.errorMessage = ''; // Limpar a mensagem de erro, se houver
      this.newProduct = {}; // Limpar o objeto newProduct
      this.loadProducts(); // Recarregar a lista de produtos
    },
    error: (error) => {
      console.error('Erro ao adicionar produto:', error);
      this.successMessage = ''; // Limpar a mensagem de sucesso, se houver
      this.errorMessage = 'Falha ao cadastrar o produto.';
    }
  });
  }

  //Carregar imagem
  updateImagePreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProduct.file = e.target.result;
        
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.newProduct.file = file;
  }


  //modal para detalhes do produto

  abrirModalDetalhesProduto(product: any) {
    this.produtoDetalhado = product;
    this.modalRef = this.modalService.show(this.modalDetalhesProduto);
  }


  // Modal adicionar produto 

  adicionarProduto(buttonNumber: number) {
    this.cancelarClicado = false;
    this.modalRef = this.modalService.show(this.modalAdicionarProduct);
  }

  fecharModalAdicionarProduto() {
    this.modalRef?.hide();
  }

  // Função para enviar atualizações
  editarProduto(productId: number) {
    this.ProductService.editProduct(productId, this.newProduct).subscribe(
      () => {
        console.log('Produto editado com sucesso.');
        this.loadProducts();
        this.successMessage = 'Produto editado com sucesso!';
        this.errorMessage = '';
        // Encerre o modo de edição
        this.isNameEditing = false;
        this.isContentEditing = false;
        this.isPriceEditing = false;
      },
      (error) => {
        console.error('Erro ao editar o produto:', error);
        this.successMessage = '';
        this.errorMessage = 'Falha ao editar o produto.';
      }
    );
  }
  
  fecharModalDetalhesProduto() {
    this.modalRef?.hide();
  }

  //Deletar produto

  excluirProduto(productId: number) {
    this.ProductService.deleteProducts(productId).subscribe(
      () => {
        console.log('Produto excluído com sucesso.');
        this.loadProducts();
        this.successMessage = 'Produto excluído com sucesso!';
        this.errorMessage = '';
        setTimeout(() => {
          this.successMessage = ''; // Limpa a mensagem após 5 segundos
          this.modalRef?.hide(); // Fecha o modal
        }, 5000);
      },
      (error) => {
        console.error('Erro ao excluir produto:', error);
        this.successMessage = '';
        this.errorMessage = 'Falha ao excluir o produto.';
        setTimeout(() => {
          this.errorMessage = ''; // Limpa a mensagem de erro após 5 segundos
        }, 5000);
      }
    );
  }
  

  @ViewChild('modalAdicionarProduct') modalAdicionarProduct!: string;

  @ViewChild('modalEditarProduto') modalEditarProduto!: string;

  @ViewChild('modalDetalhesProduto') modalDetalhesProduto!: string;

}