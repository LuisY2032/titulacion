import { Component, EventEmitter, OnInit, Output, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-grade-form',
    templateUrl: './grade-form.html',
    styleUrls: ['./grade-form.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputNumberModule, ButtonModule]
})
export class GradeForm implements OnInit {
    // 1. Inputs modernos usando Signals API (Reemplaza al viejo @Input)
    public readonly enrollmentDetail = input<any>();
    @Output() isModalGrades = new EventEmitter<boolean>(true);

    // 2. Errores del formulario usando Signals de estado
    protected formErrors = signal<string[]>([]);

    // Controles del Formulario reactivos vinculados a la vista
    protected readonly grade1Field = new FormControl<number | null>(null, [Validators.min(0), Validators.max(5)]);
    protected readonly grade2Field = new FormControl<number | null>(null, [Validators.min(0), Validators.max(5)]);
    protected readonly attendanceField = new FormControl<number | null>(null, [Validators.min(0), Validators.max(100)]);

    // Inyecciones simuladas (Bypass temporal para evitar errores de @paths rotos)
    public readonly coreService: any = null;
    public readonly messageService: any = { errorsFields: (err: any) => console.log(err) };
    protected readonly gradesHttpServices: any = null;
    protected readonly teacherDistributionsService: any = null;
    protected readonly PrimeIcons = PrimeIcons;

    ngOnInit(): void {
        this.initializeFormValues();
    }

    private initializeFormValues(): void {
        // Al usar Signals, los inputs se leen como funciones ejecutables: this.enrollmentDetail()
        const detail = this.enrollmentDetail();
        if (!detail || !detail.grades) return;

        const g1 = detail.grades.find((grade: any) => grade?.partial?.code === '1');
        const g2 = detail.grades.find((grade: any) => grade?.partial?.code === '2');

        if (g1) this.grade1Field.setValue(g1.value);
        if (g2) this.grade2Field.setValue(g2.value);

        this.attendanceField.setValue(detail.finalAttendance ?? null);
    }

    public onSubmit(): void {
        // Limpiamos el Signal de errores antes de validar
        this.formErrors.set([]);

        if (this.grade1Field.invalid) this.formErrors.update((errors) => [...errors, 'Parcial 1']);
        if (this.grade2Field.invalid) this.formErrors.update((errors) => [...errors, 'Parcial 2']);
        if (this.attendanceField.invalid) this.formErrors.update((errors) => [...errors, 'Asistencia']);

        if (this.grade1Field.valid && this.grade2Field.valid && this.attendanceField.valid) {
            alert('¡Formulario maquetado y validado con Signals con éxito!');
        } else {
            this.grade1Field.markAsTouched();
            this.grade2Field.markAsTouched();
            this.attendanceField.markAsTouched();
            this.messageService.errorsFields(this.formErrors()); // Leemos el valor del Signal errores
        }
    }
}
