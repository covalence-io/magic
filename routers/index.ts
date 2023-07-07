import express, { Application, Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { resolve } from 'path';
import api from './api';

export default function configure(app: Application) {
    app
        .get('/', (req, res, next) => {
            res.sendFile(resolve(__dirname, '../index.html'));
        })
        .use(express.static('public'))
        .use(json())
        .use('/api', api())
        .use('/magic/:token', (req, res, next) => {
            const tk = req.params.token;
            console.log(tk);

            // const row = await tokens.findOne({ token: tk });
            // if (!!row)
            // grab userid off row
            // set cookie value and render index
            console.log('Logged in');
            res.sendFile(resolve(__dirname, '../index.html'));
        })
        .use('/error', (req, res, next) => {
            next(new Error('Other Error'));
        })
        .use((req, res, next) => {
            next(new Error('Not Found'));
        })
        .use((error: Error, req: Request, res: Response, next: NextFunction) => {
            switch (error.message) {
                case 'Not Found':
                    res.sendFile(resolve(__dirname, '../notfound.html'));
                    return;
            }

            res.sendFile(resolve(__dirname, '../error.html'));
        });
}