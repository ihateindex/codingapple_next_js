import { connectDB } from '@/util/database.js';
import { ObjectId } from 'mongodb';

export default async function handler(요청, 응답) {
    const body = JSON.parse(요청.body);
    console.log(body.parent);
    const client = await connectDB;
    const db = client.db('forum');
    let list = await db
        .collection('comment')
        .find({ parent: ObjectId(body.parent) })
        .toArray();

    return 응답.status(200).json(list);
}
