import { connectDB } from '@/util/database.js';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(요청, 응답) {
    let session = await getServerSession(요청, 응답, authOptions);
    if (session) {
        요청.body.author = session.user.email;
    }

    if (요청.method === 'POST') {
        console.log(요청.body);
        if (요청.body.title === '') {
            return 응답.status(500).json('제목을 입력하세요');
        }
        if (요청.body.content === '') {
            return 응답.status(500).json('내용을 입력하세요');
        }
        try {
            const client = await connectDB;
            const db = client.db('forum');
            let result = await db.collection('post').insertOne(요청.body);
            console.log(`포스트가 삽입되었습니다. _id: ${result.insertedId}`);
            return 응답.status(200).redirect('/list');
        } catch (error) {
            console.error(error);
        }
    }
}
