import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Comment from './Comment';
import { notFound } from 'next/navigation';

export default async function Detail(props) {
    // console.log(props);
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
    // console.log(props);
    if (result === null) {
        return notFound();
    }

    return (
        <div className="p-20 detail">
            <h4>상세페이지</h4>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
            <img src={result.image} alt="" />
            <Comment parentId={props.params.id}></Comment>
        </div>
    );
}
