import { connectDB } from '@/util/database.js';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

export default async function handler(요청, 응답) {
    let session = await getServerSession(요청, 응답, authOptions);
    let body = JSON.parse(요청.body);
    if (session) {
        console.log('세션:', session);
        body.author = session.user.email;
    }

    if (요청.method === 'POST') {
        if (요청.body.content === '') {
            return 응답.status(500).json('댓글을 입력하세요');
        }
        body.parent = ObjectId(body.parent);
        console.log(body);
        try {
            const client = await connectDB;
            const db = client.db('forum');
            let result = await db.collection('comment').insertOne(body);
            console.log(`댓글이 작성되었습니다. _id: ${result.insertedId}`);

            let commentList = await db
                .collection('comment')
                .find({ parent: ObjectId(body.parent) })
                .toArray();
            return 응답.status(200).json(commentList);
        } catch (error) {}
    }
}
