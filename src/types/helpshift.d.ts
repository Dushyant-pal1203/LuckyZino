export type HelpshiftUserInfo = {
  userId: string,
  email: string,
  firstName?: string | null,
  lastName?: string | null,
  state?: string | null,
  createdAt: string,
  totalPayed: number,
  totalRedeemed: number
}