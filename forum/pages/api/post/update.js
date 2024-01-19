import { connectDB } from '@/util/database.js';
import { ObjectId } from 'mongodb';

export default async function handler(요청, 응답) {
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
            let result = await db.collection('post').updateOne({ _id: new ObjectId(요청.body._id) }, { $set: { title: 요청.body.title, content: 요청.body.content } });
            console.log(`포스트가 수정되었습니다. ${result}`);
            return 응답.status(200).redirect('/list');
        } catch (error) {
            console.error(error);
        }
    }
}
