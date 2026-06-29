import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms'; // <-- Obligatorio para [(ngModel)]
import { Subject, switchMap, catchError, EMPTY } from 'rxjs';

// PrimeNG Imports necesarios para el HTML
import { PrimeIcons } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-grade-form',
  standalone: true,
  imports: [
    FormsModule,
    InputNumberModule,
    ButtonModule
  ],
  templateUrl: './grade-form.html', // Ajustado a tu formato de nombre de archivo
  styleUrl: './grade-form.scss'     // Ajustado a tu formato de nombre de archivo
})
export class GradeForm { 
}