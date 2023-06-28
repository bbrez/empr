import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { environment } from "src/environments/environment";
import { TripModel } from "../lib/passeio.model";

@Injectable({
  providedIn: 'root',
  deps: [HttpClientModule]
})
export class PasseioService {
  constructor(private http: HttpClient, private loginService: LoginService) { }

  getPasseios() {
    return this.http.get(environment.api + '/trips', {
      headers: {
        Authorization: `Bearer ${this.loginService.token}`
      }
    })
  }

  getPasseio(id: string) {
    return this.http.get(environment.api + '/trips/' + id, {
      headers: {
        Authorization: `Bearer ${this.loginService.token}`
      }
    })
  }

  registraPasseio(passeio: TripModel) {
    return this.http.post(environment.api + '/trips', passeio, {
      headers: {
        Authorization: `Bearer ${this.loginService.token}`
      }
    })
  }

  addUserToTrip(tripId: number, userEmail: string) {
    return this.http.post(environment.api + '/trips/' + tripId + '/users', { email: userEmail },
      {
        headers: {
          Authorization: `Bearer ${this.loginService.token}`
        }
      })
  }
}