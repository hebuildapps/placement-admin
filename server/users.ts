"use server";

import { auth } from "@/lib/auth";

export const signIn = async () => {
    await auth.api.signInEmail({
    body: {
        email: "dean@mitwpu.edu.in",
        password: "password123",
    }
})
}