import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';

export namespace AdminController {
    export const userList = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string);
        const users = await AdminService.userList(page);
        res.status(200).json(users);
    }

    export const adminPanelInfo = async (req: Request, res: Response) => {
        const info = await AdminService.adminPanelInfo();
        res.status(200).json(info);
    }
}