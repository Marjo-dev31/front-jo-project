export interface orderCreateInterface {
  total: number,
  userId: string
}

export interface orderInterface extends orderCreateInterface {
  id: string
}
