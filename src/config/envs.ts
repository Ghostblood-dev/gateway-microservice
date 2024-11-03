
import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: number;
    PRODUCTS_MICROSERVICES_HOST: string;
    PRODUCTS_MICROSERVICES_PORT: number;
    ORDERS_MICROSERVICES_HOST: string;
    ORDERS_MICROSERVICES_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
    ORDERS_MICROSERVICES_HOST: joi.string().required(),
    ORDERS_MICROSERVICES_PORT: joi.number().required()
}).unknown(true)

const { error, value } = envsSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error ${error.message}`)
}

const envsVars: EnvVars = value

export const envs = {
    port: envsVars.PORT,
    productMicroservicesHost: envsVars.PRODUCTS_MICROSERVICES_HOST,
    productMicroservicesPort: envsVars.PRODUCTS_MICROSERVICES_PORT,
    orderMicroservicesHost: envsVars.ORDERS_MICROSERVICES_HOST,
    orderMicroservicesPort: envsVars.ORDERS_MICROSERVICES_PORT,
}