import { redis_client } from "../connection.redis.js";

export const setValue = async ({key, value, ttl} = {}) => {
    try {
        value = typeof value === "string" ? value : JSON.stringify(value);
        return ttl ?
            await redis_client.set(key, value, {EX: ttl}) :
            await redis_client.set(key, value);
    } catch (err) {
        console.log(err);
    }
};
export const update = async ({key, value, ttl} = {}) => {
    try {
        if(!await redis_client.exists(key))return 0
        return ttl ?
            await redis_client.set(key, value, {EX: ttl}) :
            await redis_client.set(key, value);
    } catch (err) {
        console.log(err);
    }
};
export const getValue = async (key) => {
    try {
        try {
            return JSON.parse(await redis_client.get(key));
        } catch (err) {
            return await redis_client.get(key);
        }
    } catch (err) {
        console.log(err);
    }
};
    export const ttl = async (key) => {
        try {
            return await redis_client.ttl(key);
        } catch (err) {
            console.log(err);
        }
    };
    export const exists = async (key) => {
        try {
            return await redis_client.exists(key);
        } catch (err) {
            console.log(err);
        }
    };
    export const expire = async ({key, ttl} = {}) => {
        try {
            return await redis_client.expire(key, ttl);
        } catch (err) {
            console.log(err);
        }
    };
    export const delKey = async (key) => {
        try {
            if(!key?.length)return 0
            return await redis_client.del(key);
        } catch (err) {
            console.log(err);
        }
    };
    export const keys = async (pattern) => {
        try {
            return await redis_client.keys(`${pattern}`);
        } catch (err) {
            console.log(err);
        }
    };
    export const incr = async (key) => {
        try {
            return await redis_client.incr(key);
        } catch (err) {
            console.log(err);
        }
    };