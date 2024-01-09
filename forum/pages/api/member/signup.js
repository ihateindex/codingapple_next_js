import { connectDB } from '@/util/database.js';

export default async function handler(요청, 응답) {
    if (요청.method === 'POST') {
        console.log(요청.body);
        if (요청.body.member_id === '') {
            return 응답.status(500).json('아이디를 입력하세요');
        }
        let member_id = 요청.body.member_id;
        if (요청.body.member_password === '') {
            return 응답.status(500).json('비밀번호를 입력하세요');
        }
        try {
            const client = await connectDB;
            const db = client.db('forum');
            let memberArray = await db.collection('member_info').find().toArray();
            // console.log(memberArray);
            memberArray.map((value, index) => {
                if (member_id === value.id) {
                    return 응답.status(500).json('중복된 아이디입니다.');
                }
            });
            let result2 = await db.collection('member_info').insertOne(요청.body);
            if (result2) {
                return 응답.status(200).redirect('/');
            }
        } catch (error) {
            console.error(error);
        }
    }
}
