import { connectDB } from '@/util/database.js';
// import DetailLink from './DetailLink';
import ListItem from './ListItem';
export default async function List() {
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').find().toArray();
    // console.log(result);
    result = result.map((value) => {
        value._id = value._id.toString();
        return value;
    });
    return (
        <div className="list-bg">
            <ListItem result={result}></ListItem>
        </div>
    );
}
