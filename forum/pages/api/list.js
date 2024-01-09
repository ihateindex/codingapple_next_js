import { connectDB } from '@/util/database.js';

export default async function handler(요청, 응답) {
    const client = await connectDB;
    const db = client.db('forum');
    let list = await db.collection('post').find().toArray();
    return 응답.status(200).json(list);
}
