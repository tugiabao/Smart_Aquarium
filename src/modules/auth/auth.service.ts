import { Injectable, UnauthorizedException } from "@nestjs/common"
import { supabase } from "../../config/supabase.config"
import type { RegisterDto } from "./dto/register.dto"
import type { LoginDto } from "./dto/login.dto"

@Injectable()
export class AuthService {
  async register(registerDto: RegisterDto) {
    const { email, password, username } = registerDto

    // Create user in Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw new Error(`Registration failed: ${authError.message}`)

    // Create user profile in database
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: data.user?.id,
        email,
        username,
      },
    ])

    if (profileError) throw new Error(`Failed to create user profile: ${profileError.message}`)

    return {
      user: data.user,
      session: data.session,
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw new UnauthorizedException("Invalid credentials")

    return {
      user: data.user,
      session: data.session,
    }
  }

  async logout(accessToken: string) {
    const { error } = await supabase.auth.signOut()

    if (error) throw new Error(`Logout failed: ${error.message}`)

    return { success: true }
  }

  async verifyToken(accessToken: string) {
    const { data, error } = await supabase.auth.getUser(accessToken)

    if (error) throw new UnauthorizedException("Invalid token")

    return data.user
  }

  async getUserProfile(userId: string) {
    const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

    if (error) throw new Error(`Failed to fetch user profile: ${error.message}`)

    return data
  }
}
