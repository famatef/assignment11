import mongoose from 'mongoose';
import { DB_URL_ONLINE } from '../../config/config.service.js';

export default async function connectionDB(timeout = 5000) {
    try {
        

        await mongoose.connect(DB_URI_ONLINE, {
            serverSelectionTimeoutMS: timeout,
        });
        console.log('Connected to DB');
    } catch (error) {
        console.log('failed connected to DB');
        
    }
}
