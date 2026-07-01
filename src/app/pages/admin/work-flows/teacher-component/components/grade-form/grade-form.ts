import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    // Inyecciones vacías/any simuladas para maquetación sin errores de compilación
    public readonly coreService: any = null;
    public readonly messageService: any = { errorsFields: (err: any) => console.log(err) };
    protected readonly gradesHttpServices: any = null;
    protected readonly teacherDistributionsService: any = null;

    // Input mockeado para que acepte cualquier estructura en la vista por ahora
    @Input({ required: false }) enrollmentDetail!: any;
    @Output() isModalGrades = new EventEmitter<boolean>(true);

    protected readonly PrimeIcons = PrimeIcons;
    protected formErrors: string[] = [];

    // Controles del Formulario reactivos básicos
    protected readonly grade1Field = new FormControl<number | null>(null, [Validators.min(0), Validators.max(5)]);
    protected readonly grade2Field = new FormControl<number | null>(null, [Validators.min(0), Validators.max(5)]);
    protected readonly attendanceField = new FormControl<number | null>(null, [Validators.min(0), Validators.max(100)]);

    ngOnInit(): void {
        this.initializeFormValues();
    }

    private initializeFormValues(): void {
        if (!this.enrollmentDetail || !this.enrollmentDetail.grades) return;

        const g1 = this.enrollmentDetail.grades.find((grade: any) => grade?.partial?.code === '1');
        const g2 = this.enrollmentDetail.grades.find((grade: any) => grade?.partial?.code === '2');

        if (g1) this.grade1Field.setValue(g1.value);
        if (g2) this.grade2Field.setValue(g2.value);

        this.attendanceField.setValue(this.enrollmentDetail.finalAttendance ?? null);
    }

    public onSubmit(): void {
        if (this.grade1Field.valid && this.grade2Field.valid && this.attendanceField.valid) {
            alert('¡Formulario maquetado correctamente!');
        } else {
            this.grade1Field.markAsTouched();
            this.grade2Field.markAsTouched();
            this.attendanceField.markAsTouched();
        }
    }
}
