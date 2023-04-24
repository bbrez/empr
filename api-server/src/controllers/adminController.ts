import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';

export namespace AdminController {
    export const adminPanelInfo = async (req: Request, res: Response) => {
        const info = await AdminService.adminPanelInfo();
        res.status(200).json(info);
    }
}