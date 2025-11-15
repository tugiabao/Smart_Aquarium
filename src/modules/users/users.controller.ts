import { Controller, Get, Delete, UseGuards } from "@nestjs/common"
import { UsersService } from "./users.service"
import { AuthGuard } from "../../common/guards/auth.guard"

@Controller("api/users")
@UseGuards(AuthGuard)
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
