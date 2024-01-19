import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function Edit(props) {
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
    console.log(props);

    const _id = result._id;
    const title = result.title;
    const content = result.content;

    return (
        <div className="p-20">
            <h4>글수정</h4>
            <form action="/api/post/update" method="POST">
                <input type="hidden" name="_id" value={_id.toString()}></input>
                <input type="text" name="title" defaultValue={title} />
                <input type="text" name="content" defaultValue={content} />
                <button type="submit">수정</button>
            </form>
        </div>
    );
}
