import { connectDB } from '@/util/database.js';
import Link from 'next/link';
import DetailLink from './DetailLink';
export default async function List() {
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').find().toArray();
    console.log(result);
    return (
        <div className="list-bg">
            {result.map((item, index) => {
                return (
                    <div className="list-item" key={index}>
                        <Link href={`/detail/${item._id}`}>
                            <h4>{item.title}</h4>
                        </Link>
                        {/* <DetailLink></DetailLink> */}
                        <Link href={`/edit/${item._id}`}>글수정</Link>
                        <p>1월 1일</p>
                    </div>
                );
            })}
        </div>
    );
}
