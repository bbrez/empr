import { CompanyModel } from "./company.model";
import { UserModel } from "./user.model";
import { UsersOnTrips } from "./usersOnTrips.model";

export interface TripModel {
    id?: number;
    name: string;
    place: string;
    startDate: string;
    endDate: string;

    isActivated: boolean;
    areaCenter?: string;
    areaRadius?: number;

    meetingPoint?: string;

    company?: CompanyModel;
    UsersOnTrips?: UsersOnTrips[];
}