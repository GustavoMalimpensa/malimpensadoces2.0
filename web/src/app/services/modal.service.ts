import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ModalService {
  private modalState = new BehaviorSubject<boolean>(false);

  showModal(): void {
    this.modalState.next(true);
  }

  hideModal(): void {
    this.modalState.next(false);
  }

  getModalState(): Observable<boolean> {
    return this.modalState.asObservable();
  }
}
