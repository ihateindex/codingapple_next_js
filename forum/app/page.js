import { connectDB } from '@/util/database.js';
import { MongoClient } from 'mongodb';

export default async function Home() {
    const client = await connectDB;
    const db = client.db('forum');
    await db.collection('post').find().toArray();

    return <div>안녕</div>;
}
