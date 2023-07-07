import { Router } from 'express';
import * as crypto from 'crypto';

export default function users() {
    const router = Router();

    router
        .get('/', (req, res, next) => {
            res.json({
                id: 1,
                firstname: 'Matt',
                lastname: 'Morgan',
            });
        })
        .get('/magic', (req, res, next) => {
            const body = req.body;
            const email = body.email;

            // const user = await users.findOne({ email: email });
            let token = crypto.randomBytes(32).toString('hex');

            // check your database for a row with this token
            // let existing = await tokens.findOne({ token: token });

            // while (!!existing) {
            //     token = crypto.randomBytes(32).toString('hex');
            //     existing = await tokens.findOne({ token: token });
            // }

            // store token in DB with userid and expire time

            const magicUrl = `http://localhost:3000/magic/${token}`;
            // send email with link containing magicUrl

            console.log(magicUrl);

            res.json({ url: magicUrl })
        });

    return router;
}