import { Controller, Get, Delete } from "@nestjs/common"
import { UsersService } from "./users.service"

@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @Get(":id")
  async getUserById(id: string) {
    return this.usersService.getUserById(id)
  }

  @Delete(":id")
  async deleteUser(id: string) {
    return this.usersService.deleteUser(id)
  }
}
