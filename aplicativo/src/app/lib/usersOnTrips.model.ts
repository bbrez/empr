import { TripModel } from "./passeio.model";
import { UserModel } from "./user.model";

export interface UsersOnTrips {
    user: UserModel;
    trip: TripModel;
}