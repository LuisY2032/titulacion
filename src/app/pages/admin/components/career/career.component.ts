import {Component} from '@angular/core';
import {StateCareerComponent} from "@/pages/admin/components/state-career/state-career.component";
import {PrincipalDataComponent} from "@/pages/admin/components/principla-data/principal-data.component";
import {SecondaryDataComponent} from "@/pages/admin/components/secondary-data/secondary-data.component";


@Component({
    selector: 'app-career',
    imports: [
        StateCareerComponent,
        PrincipalDataComponent,
        SecondaryDataComponent
    ],
    templateUrl: './career.component.html'
})
export class CareerComponent  {

}
