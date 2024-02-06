'use client';
import { useState, useEffect } from 'react';

export default function Comment(props) {
    let [comment, setComment] = useState('');
    let [commentList, setCommentList] = useState([]);

    useEffect(() => {
        fetch('/api/comment/list', {
            method: 'POST',
            body: JSON.stringify({
                parent: props.parentId,
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
                // console.log(response);
                setCommentList(response);
            });
    }, []);

    return (
        <div>
            <hr></hr>
            {commentList.length > 0
                ? commentList.map((value, index) => {
                      return <p key={index}>{value.content}</p>;
                  })
                : '댓글이 없습니다.'}
            <input
                type="text"
                value={comment}
                onChange={(event) => {
                    setComment(event.target.value);
                }}
            />
            <button
                onClick={() => {
                    fetch('/api/comment/new', {
                        method: 'POST',
                        body: JSON.stringify({
                            content: comment,
                            parent: props.parentId,
                        }),
                    })
                        .then((resoponse) => {
                            return resoponse.json();
                        })
                        .then((response) => {
                            console.log(response);
                            setComment('');
                            setCommentList(response);
                        });
                }}
            >
                댓글전송
            </button>
        </div>
    );
}
