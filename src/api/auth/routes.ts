import { authPlugin } from "@/api/auth/plugin"
import { loginBodySchema, signupBodySchema } from "@/api/auth/schemas"
import type ExtendedClient from "@/client"
import {
  ACCESS_TOKEN_EXP,
  JWT_NAME,
  JWT_SECRET,
  REFRESH_TOKEN_EXP,
} from "@/constants"
import { getExpTimestamp } from "@/functions"
import jwt from "@elysiajs/jwt"
import { Elysia } from "elysia"

export const createAuthRoutes = (client: ExtendedClient) => {
  return new Elysia({ prefix: "/auth" })
    .use(
      jwt({
        name: JWT_NAME,
        secret: JWT_SECRET,
      }),
    )
    .post(
      "/sign-in",
      async ({ body, jwt, cookie: { accessToken, refreshToken }, set }) => {
        const user = await client.prisma.panelUsers.findFirst({
          where: { username: body.username },
          select: {
            id: true,
            password: true,
          },
        })

        if (!user) {
          set.status = "Bad Request"
          throw new Error(
            "The username address or password you entered is incorrect",
          )
        }

        const matchPassword = await Bun.password.verify(
          body.password,
          user.password,
          "bcrypt",
        )
        if (!matchPassword) {
          set.status = "Bad Request"
          throw new Error(
            "The email address or password you entered is incorrect",
          )
        }

        const accessJWTToken = await jwt.sign({
          sub: user.id,
          exp: getExpTimestamp(ACCESS_TOKEN_EXP),
        })
        accessToken.set({
          value: accessJWTToken,
          httpOnly: true,
          maxAge: ACCESS_TOKEN_EXP,
          path: "/",
        })

        const refreshJWTToken = await jwt.sign({
          sub: user.id,
          exp: getExpTimestamp(REFRESH_TOKEN_EXP),
        })
        refreshToken.set({
          value: refreshJWTToken,
          httpOnly: true,
          maxAge: REFRESH_TOKEN_EXP,
          path: "/",
        })

        const updatedUser = await client.prisma.panelUsers.update({
          where: {
            id: user.id,
          },
          data: {
            refreshToken: refreshJWTToken,
          },
        })

        return {
          message: "Sig-in successfully",
          data: {
            user: updatedUser,
            accessToekn: accessJWTToken,
            refreshToken: refreshJWTToken,
          },
        }
      },
      {
        body: loginBodySchema,
      },
    )
    .post(
      "/sign-up",
      async ({ body, cookie: { accessToken }, jwt, set }) => {
        const genesisUser = await client.prisma.panelUsers.findFirst({
          where: {
            is_genesis: true,
          },
        })

        if (genesisUser) {
          if (!accessToken.value) {
            set.status = "Unauthorized"
            throw new Error("Genesis access token is required for signup")
          }

          const jwtPayload = await jwt.verify(accessToken.value)
          if (!jwtPayload || jwtPayload.sub !== genesisUser.id) {
            set.status = "Forbidden"
            throw new Error("Invalid genesis access token")
          }

          if (body.is_genesis) {
            set.status = "Forbidden"
            throw new Error("Genesis user cannot create another genesis user")
          }
        }

        const password = await Bun.password.hash(body.password, {
          algorithm: "bcrypt",
          cost: 10,
        })

        const user = await client.prisma.panelUsers.create({
          data: {
            ...body,
            password,
          },
        })
        return {
          message: "Account created successfully",
          data: {
            user,
          },
        }
      },
      {
        body: signupBodySchema,
        error({ code, set, body }) {
          if ((code as unknown) === "P2002") {
            set.status = "Conflict"
            return {
              name: "Error",
              message: `The username address provided ${body.username} already exists`,
            }
          }
        },
      },
    )
    .post(
      "/refresh",
      async ({ cookie: { accessToken, refreshToken }, jwt, set }) => {
        if (!refreshToken.value) {
          set.status = "Unauthorized"
          throw new Error("Refresh token is missing")
        }
        const jwtPayload = await jwt.verify(refreshToken.value)
        if (!jwtPayload) {
          set.status = "Forbidden"
          throw new Error("Refresh token is invalid")
        }

        const userId = jwtPayload.sub

        const user = await client.prisma.panelUsers.findUnique({
          where: {
            id: userId,
          },
        })

        if (!user) {
          set.status = "Forbidden"
          throw new Error("Refresh token is invalid")
        }
        const accessJWTToken = await jwt.sign({
          sub: user.id,
          exp: getExpTimestamp(ACCESS_TOKEN_EXP),
        })
        accessToken.set({
          value: accessJWTToken,
          httpOnly: true,
          maxAge: ACCESS_TOKEN_EXP,
          path: "/",
        })

        const refreshJWTToken = await jwt.sign({
          sub: user.id,
          exp: getExpTimestamp(REFRESH_TOKEN_EXP),
        })
        refreshToken.set({
          value: refreshJWTToken,
          httpOnly: true,
          maxAge: REFRESH_TOKEN_EXP,
          path: "/",
        })

        await client.prisma.panelUsers.update({
          where: {
            id: user.id,
          },
          data: {
            refreshToken: refreshJWTToken,
          },
        })

        return {
          message: "Access token generated successfully",
          data: {
            accessToken: accessJWTToken,
            refreshToken: refreshJWTToken,
          },
        }
      },
    )
    .use(authPlugin(client))
    .post(
      "/logout",
      async ({ cookie: { accessToken, refreshToken }, user }) => {
        accessToken.remove()
        refreshToken.remove()

        await client.prisma.panelUsers.update({
          where: {
            id: user.id,
          },
          data: {
            refreshToken: null,
          },
        })
        return {
          message: "Logout successfully",
        }
      },
    )
    .get("/me", ({ user }) => {
      return {
        message: "Fetch current user",
        data: {
          user,
        },
      }
    })
}
