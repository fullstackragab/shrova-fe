import { Component } from '@angular/core';
import { BtnContinueComponent } from '../../components/btn-continue/btn-continue.component';

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [BtnContinueComponent],
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.css',
})
export class CancelComponent {}
