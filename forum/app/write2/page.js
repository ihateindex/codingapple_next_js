import { connectDB } from '@/util/database';
import { revalidatePath } from 'next/cache';

export default async function Write2() {
    const db = (await connectDB).db('forum');
    let result = await db.collection('post_test').find().toArray();
    // console.log(result);

    // * server actions인 handleSubmit
    // * 이렇게 한 페이지에 html 부분과 서버 코드 부분이 있는 구조는 PHP,JSP의 구조인데 과거에 코드가 다 섞여있어 지저분하다고 사용하지 않게 되었었음
    // * 그런데 Next.js의 신기능으로 추가 된 것임. 다시 유행이 오는 것인가..
    async function handleSubmit(formData) {
        // * use server 사용시 서버 API로 변함 (server actions)
        'use server';
        const db = (await connectDB).db('forum');
        db.collection('post_test').insertOne({ title: formData.get('title') });

        // * form 태그의 action에 server actions을 넣을시 폼 전송시 새로고침이 되지 않습니다.
        // * 이를 해결하기 위해 수동으로 새로고침을 해줘야하는데, router.refresh()를 사용하거나 또는 revalidatePath(), revalidateTag()이 사용 가능합니다.
        // * revalidatePath(), revalidateTag() 특정 페이지 캐시 삭제 기능을 가졌는데 새로고침과 거의 동일합니다. 차이는 페이지 전체 새로고침이 아니라 변경된 부분만 새로고침합니다.
        revalidatePath('/write2');
        // revalidateTag('/write2');
    }

    return (
        <div>
            {/* // * form action에 ""가 아닌 {} 사용시 server actions 사용 가능, submit시 handleSubmit 함수 실행 */}
            <form action={handleSubmit}>
                <input type="text" name="title" />
                <button type="submit">버튼</button>
            </form>
            {result
                ? result.map((a) => {
                      return <p>글제목: {a.title}</p>;
                  })
                : null}
        </div>
    );
}
