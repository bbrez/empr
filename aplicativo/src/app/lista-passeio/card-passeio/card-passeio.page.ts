import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TripModel } from "src/app/lib/passeio.model";
import { LoginService } from "src/app/services/login.service";

@Component({
    selector: 'app-card-passeio',
    templateUrl: './card-passeio.page.html',
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class CardPasseioPage {
    @Input() passeio: TripModel | undefined;

    constructor(public loginService: LoginService) { }

    roleDetails(role: string) {
        if(!this.passeio) return console.log('Passeio não definido');

        switch (role) {
            case 'Admin':
                return 'admin-passeio/' + this.passeio.id;
            case 'Manager':
                return 'manager-passeio/' + this.passeio.id;
            case 'Guide':
                return 'guide-passeio/' + this.passeio.id;
            case 'Tourist':
                return 'tourist-passeio/' + this.passeio.id;
            default:
                return 'login';
        }
    }
}