import { t } from "elysia"

const signupBodySchema = t.Object({
  username: t.String({ maxLength: 60, minLength: 1 }),
  password: t.String({ minLength: 8 }),
  is_genesis: t.Optional(t.Boolean()),
})

const loginBodySchema = t.Object({
  username: t.String({ maxLength: 60, minLength: 1 }),
  password: t.String({ minLength: 8 }),
})

export { signupBodySchema, loginBodySchema }
