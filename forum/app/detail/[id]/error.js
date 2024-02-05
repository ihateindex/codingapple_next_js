// * 에러페이지에 쓰이는 error.js는 무조건 클라이언트 컴포넌트이다.
// * page.js와 동일선상에 넣어두면 에러 발생시 표시되는데, 동일선상에 error.js가 없다면 상위 폴더에 있는지 찾는다.
// * 이를 이용하여 최상위에 error.js 페이지를 만들어두면 모든 페이지에서 사용 가능
// * error.js를 최상위에 두면 동일선상에 layout.js가 있게되는데 error.js는 layout.js의 에러는 체크 못함.
// * globals-error.js를 만들면 최상위 layout.js 에러 체크 가능
'use client';

// * props를 받게 되어있는데 props로는 error와 reset이 들어온다.
export default function Error(error, reset) {
    return (
        <div>
            <h4>에러남 ㅅㄱ</h4>
            <button
                onClick={() => {
                    // * 실행시 페이지 다시로드
                    reset();
                }}
            ></button>
        </div>
    );
}
