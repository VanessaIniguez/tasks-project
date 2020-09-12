import { JwtPayload } from './../auth/jwt-payload.interface';

export class AuthUtils{
    /**
     * Return payload
     * @param email 
     */
    static getPayload(email: string): JwtPayload{
        const payload: JwtPayload = {email};
        return payload;
    }
}