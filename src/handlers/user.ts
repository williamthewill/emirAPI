import { Request, Response } from 'express'
import * as service from '#services/user'

export async function getUserData(req: Request, res: Response) {
    const response = await service.getUserData();
    
    res.status(200).json(response)
}

export async function getUserDependents(req: Request, res: Response) {
    const response = await service.getUserDependents();

    res.status(200).json(response);
}

export async function getUserInvoices(req: Request, res: Response) {
    const response = await service.getUserInvoices();

    res.status(200).json(response);
}