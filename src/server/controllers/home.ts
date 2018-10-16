import { Request, Response } from "express";

export let index = (_req: Request, res: Response) => {

    res.json({
        message: `Welcome to Metvn API.`,
        version: "1.0.0"
    });
};
