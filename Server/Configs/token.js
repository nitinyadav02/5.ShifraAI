import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key"

export const genToken = async (userId) => {
    try {
        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
        return token
    } catch (error) {
        console.log(error)

    }
}