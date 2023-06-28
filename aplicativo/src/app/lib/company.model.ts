import { TripModel } from "./passeio.model";
import { UserModel } from "./user.model";

export interface CompanyModel {
    name: string;

    users?: UserModel[];
    trips?: TripModel[];
}