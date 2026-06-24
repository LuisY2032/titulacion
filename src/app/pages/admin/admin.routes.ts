import {Routes} from '@angular/router';
import {MY_ROUTES} from '@routes';
import {CareerComponent} from "@modules/admin/work-flows/career-registration/components/career/career.component";

export default [
    {
        path: MY_ROUTES.adminPages.user.base,
        title: 'Listado de Usuarios',
        loadComponent: () => CareerComponent
    },
] as Routes;
