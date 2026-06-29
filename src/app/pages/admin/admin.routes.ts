import {Routes} from '@angular/router';
import {MY_ROUTES} from '@routes';
import {CareerComponent} from "@modules/admin/work-flows/career-registration/components/career/career.component";
import { GradeForm } from './work-flows/teacher-component/components/grade-form/grade-form';


export default [
    {
        path: MY_ROUTES.adminPages.user.base,
        title: 'Listado de Usuarios',
        loadComponent: () => CareerComponent
    },
    {
        path: 'teacher',
        title: ' Listado',
        loadComponent: () => GradeForm
    }
] as Routes;
