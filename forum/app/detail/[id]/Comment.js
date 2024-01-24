'use client';
import { useState } from 'react';

export default function Comment(props) {
    let [comment, setComment] = useState('');

    return (
        <div>
            <div>댓글목록보여줄부분</div>
            <input
                type="text"
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
                    });
                }}
            >
                댓글전송
            </button>
        </div>
    );
}
