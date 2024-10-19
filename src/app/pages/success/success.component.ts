import { Component, OnInit } from '@angular/core';
import { BtnContinueComponent } from '../../components/btn-continue/btn-continue.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [BtnContinueComponent, RouterLink],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.clear();
  }
}
