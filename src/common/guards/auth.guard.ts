import { Injectable, type CanActivate, type ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { supabase } from "../../config/supabase.config"

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader) throw new UnauthorizedException("Missing authorization header")

    const token = authHeader.split(" ")[1]
    if (!token) throw new UnauthorizedException("Invalid token format")

    try {
      const { data, error } = await supabase.auth.getUser(token)
      if (error) throw new UnauthorizedException("Invalid token")

      request.user = data.user
      return true
    } catch {
      throw new UnauthorizedException("Token verification failed")
    }
  }
}
