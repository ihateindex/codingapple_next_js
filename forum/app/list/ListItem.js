'use client';
import Link from 'next/link';
export default function ListItem({ result }) {
    return (
        <>
            {result.map((item, index) => {
                return (
                    <div className="list-item" key={index}>
                        <Link href={`/detail/${item._id}`}>
                            <h4>{item.title}</h4>
                        </Link>
                        {/* <DetailLink></DetailLink> */}
                        <Link href={`/edit/${item._id}`}>✏️</Link>
                        <span
                            onClick={(event) => {
                                fetch('/api/post/delete', {
                                    method: 'DELETE',
                                    body: JSON.stringify({
                                        _id: item._id.toString(),
                                    }),
                                })
                                    .then((response) => {
                                        if (response.status == 200) {
                                            return response.json();
                                        } else {
                                            // 서버 요청 실패시
                                            console.log(response);
                                            console.log('서버 요청 실패');
                                        }
                                    })
                                    .then((response) => {
                                        // 서버 요청 성공시
                                        // console.log(response);
                                        if (response) {
                                            console.log('서버 요청 성공');
                                            event.target.parentElement.style.opacity = 0;
                                            setTimeout(() => {
                                                event.target.parentElement.style.display = 'none';
                                            }, 1000);
                                        }
                                    })
                                    .catch((error) => {
                                        // fetch 에러시, 인터넷 문제등..
                                        console.log(error);
                                    });
                            }}
                        >
                            🗑️
                        </span>
                        <p>1월 1일</p>
                    </div>
                );
            })}
        </>
    );
}
