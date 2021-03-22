import expressJwt from 'express-jwt';
import config from '../config/var.config';

const jwt = () => {
    return expressJwt({ secret: config.jwtSecret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/healthCheck',
            {url:  /^\/api\/auth\/.*/},
            {url: /^\/api\/util\/.*/},
        ]
    });
};
export default jwt;
