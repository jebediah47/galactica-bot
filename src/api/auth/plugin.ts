import type ExtendedClient from "@/client"
import { JWT_NAME, JWT_SECRET } from "@/constants"
import jwt from "@elysiajs/jwt"
import type { Elysia } from "elysia"

export const authPlugin = (client: ExtendedClient) => (app: Elysia) =>
  app
    .use(
      jwt({
        name: JWT_NAME,
        secret: JWT_SECRET,
      }),
    )
    .derive(async ({ jwt, cookie: { accessToken }, set }) => {
      if (!accessToken.value) {
        set.status = "Unauthorized"
        throw new Error("Access token is missing")
      }
      const jwtPayload = await jwt.verify(accessToken.value)
      if (!jwtPayload) {
        set.status = "Forbidden"
        throw new Error("Access token is invalid")
      }

      const userId = jwtPayload.sub
      const user = await client.prisma.panelUsers.findUnique({
        where: {
          id: userId,
        },
      })

      if (!user) {
        set.status = "Forbidden"
        throw new Error("Access token is invalid")
      }

      return { user }
    })
