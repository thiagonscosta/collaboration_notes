import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthenticateRepository } from './authenticate.repository'
import { User } from './models/user'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authenticateRepository: AuthenticateRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: { sub: User['id'], name: string }) {
        const user = this.authenticateRepository.findUserById(payload.sub);
        if (!user) {
            console.log('not user')
            throw new UnauthorizedException('Unauthorized')
        }
        return { userId: payload.sub, username: payload.name }
    }
}