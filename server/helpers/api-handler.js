import { jwtMiddleware } from "../middlewares/jwt-middleware";
import { errorHandler } from "./errorHandler";

export const apiHandler = (handler) => {
    return async (req, res) => {
        try {
            // global middleware
            await jwtMiddleware(req, res)

            // route handling
            await handler(req, res)
        } catch (error) {
            errorHandler(error, res)
        }
    }
}