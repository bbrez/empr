import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';

export namespace AdminController {
    export const userList = async (req: Request, res: Response) => {
        req.query.page = req.query.page || "1";
        const page = parseInt(req.query.page as string);
        const users = await AdminService.userList(page);
        res.status(200).json(users);
    }

    export const companyList = async (req: Request, res: Response) => {
        const companies = await AdminService.companyList();
        res.status(200).json(companies);
    }

    export const createCompany = async (req: Request, res: Response) => {
        const { name } = req.body;
        const company = await AdminService.createCompany(name);
        res.status(201).json(company);
    }

    export const tripList = async (req: Request, res: Response) => {
        req.query.page = req.query.page || "1";
        const page = parseInt(req.query.page as string);
        const trips = await AdminService.tripList(page);
        res.status(200).json(trips);
    }

    export const adminPanelInfo = async (req: Request, res: Response) => {
        const info = await AdminService.adminPanelInfo();
        res.status(200).json(info);
    }
}