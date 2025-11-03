"use server";

import { auth } from "@/lib/auth";

export const signIn = async () => {
    await auth.api.signInEmail({
    body: {
        email: "orcdev@test.com",
        password: "password123",
    }
})
}