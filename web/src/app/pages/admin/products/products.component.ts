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
  isImageEditing: boolean = false;
  isEditing: boolean = false;
  novaImagem: File | null = null;


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

  //Carregar Imagens

  updateImagePreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProduct.file = e.target.result;
        
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  //Modal para ver Detalhes do produto

  abrirModalDetalhesProduto(product: any) {
    this.produtoDetalhado = product;
    this.modalRef = this.modalService.show(this.modalDetalhesProduto);
  }

  //Função para remover a imagem
  removerImagem() {
    // Defina isImageEditing como verdadeiro para permitir que o usuário adicione uma nova imagem
    this.isImageEditing = true;
    // Resete o campo de upload de arquivo
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  
  // Modal adicionar produto 

  adicionarProduto(buttonNumber: number) {
    this.cancelarClicado = false;
    this.modalRef = this.modalService.show(this.modalAdicionarProduct);
  }

  fecharModalAdicionarProduto() {
    this.modalRef?.hide();
  }

  // Função para editar o produto

  editarProduto(productId: number) {
    
    const formData = new FormData();
  
    // Adicione outros campos de edição ao FormData
    formData.append('name', this.newProduct.name);
    formData.append('content', this.newProduct.content);
    formData.append('price', this.newProduct.price);
    formData.append('file', this.newProduct.file);
  
  
    // Envie a requisição para o backend
    this.ProductService.editProduct(productId, formData).subscribe(
      () => {
        console.log('Produto editado com sucesso.');
        this.loadProducts();
        this.successMessage = 'Produto editado com sucesso!';
        this.errorMessage = '';
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

  //Função para adicionar nova imagem
  adicionarNovaImagem() {
    // Reset a variável novaImagem para permitir ao usuário selecionar um novo arquivo
    this.novaImagem = null;
  
    // Limpe o campo de upload de arquivo
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  

  //Função para iniciar/encerrar a edição
  
  toggleEdicao() {
    this.isEditing = !this.isEditing;
  }

  //Pré visualização da imagem Adicionada

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.newProduct.file = file;
  }

  //Pré visualização da imagem Editar

  onFileSelectedEdite(event: any) {
    const file = event.target.files[0];
    this.newProduct.file = file;
  }

  //Função deletar produto

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