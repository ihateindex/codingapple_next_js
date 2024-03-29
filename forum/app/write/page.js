'use client';

import { useState } from 'react';

export default function Write() {
    let [src, setSrc] = useState('');
    return (
        <div className="p-20">
            <h4>글작성</h4>
            <form action="/api/post/new" method="POST">
                <input type="text" name="title" placeholder="글제목" />
                <input type="text" name="content" placeholder="글내용" />
                <input
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                        let file = event.target.files[0];
                        let filename = encodeURIComponent(file.name);
                        let res = await fetch('/api/post/image?file=' + filename);
                        res = await res.json();
                        console.log(res);

                        //S3 업로드
                        const formData = new FormData();
                        Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                            formData.append(key, value);
                        });
                        let 업로드결과 = await fetch(res.url, {
                            method: 'POST',
                            body: formData,
                        });
                        console.log(업로드결과);

                        if (업로드결과.ok) {
                            setSrc(업로드결과.url + '/' + filename);
                        } else {
                            console.log('실패');
                        }
                    }}

                    // onChange={(e) => {
                    //     setSrc(e.target.files[0]);
                    // }}
                />
                {/* <input type="hidden" name="image" value={encodeURIComponent(src)} /> */}
                <input type="hidden" name="image" value={src} />
                {/* <img src={src ? URL.createObjectURL(src) : ''} /> */}
                <img src={src} />
                <button type="submit">등록</button>
            </form>
        </div>
    );
}
