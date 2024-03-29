import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(요청, 응답) {
    let session = await getServerSession(요청, 응답, authOptions);
    console.log(session);

    if (요청.method === 'DELETE') {
        console.log(JSON.parse(요청.body));

        const data = JSON.parse(요청.body);
        const _id = data._id;

        try {
            const client = await connectDB;
            const db = client.db('forum');
            let result = await db.collection('post').deleteOne({ _id: new ObjectId(_id), author: session.user.email });
            // console.log(result);
            if (!result.deletedCount) {
                return 응답.status(500).json('삭제실패');
            }
            return 응답.status(200).json('삭제완료');
        } catch (error) {
            console.error(error);
        }
    }
}
