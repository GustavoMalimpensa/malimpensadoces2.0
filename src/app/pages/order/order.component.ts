import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Verifique se o parâmetro "from" está presente na URL e se é igual a "home".
    const fromParam = this.route.snapshot.queryParamMap.get('from');
    
    if (fromParam !== 'home') {
      this.router.navigate(['/']); // Redirecionar para a página inicial
    }
  }

}
