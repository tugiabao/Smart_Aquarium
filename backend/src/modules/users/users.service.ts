import { Injectable } from "@nestjs/common"
import { supabase } from "../../config/supabase.config"

@Injectable()
export class UsersService {
  async getAllUsers() {
    const { data, error } = await supabase.from("users").select("*")

    if (error) throw new Error(`Failed to fetch users: ${error.message}`)
    return data
  }

  async getUserById(userId: string) {
    const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

    if (error) throw new Error(`Failed to fetch user: ${error.message}`)
    return data
  }

  async deleteUser(userId: string) {
    const { error } = await supabase.from("users").delete().eq("id", userId)

    if (error) throw new Error(`Failed to delete user: ${error.message}`)
    return { success: true }
  }
}
