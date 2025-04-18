import { UserInterface } from "./user.interface"

export interface orderCreateInterface {
  total: number,
  user: UserInterface
}

export interface orderInterface extends orderCreateInterface {
  id: string
}
