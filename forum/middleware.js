import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(request) {
    // * basic
    // console.log(request.nextUrl); // 현재 유저가 요청중인 url
    // console.log(request.cookies); // 유저의 쿠키
    // console.log(request.headers); // 유저의 headers 정보 (이전방문페이지, 사용중인 OS,브라우저, 선호하는 언어, IP, 쿠키등의 유저 개인정보)

    // // middleware 기능 마지막엔 아래와 같은 NextResponse를 써줘야합니다.
    // NextResponse.next() // 통과
    // NextResponse.redirect() // 다른 페이지로 강제 이동, 주소창도 변경
    // NextResponse.rewrite() // 다른 페이지로 강제 이동, 주소창은 그대로
    // *

    // * 1. /list 페이지 접속기록 저장하기
    if (request.nextUrl.pathname.startsWith('/list')) {
        console.log(new Date());
        console.log(request.headers.get('sec-ch-ua-platform'));
        return NextResponse.next(); // 통과
    }

    // * 2. 미로그인 유저 /write 접속시 로그인페이지로 랜딩
    // * Next Auth를 사용하고 JWT 방식으로 사용해야 유저 정보 쉽게 출력이 가능, env파일에 NEXTAUTH_SECRET={JWT 만들때 작성한 secret key} 작성
    if (request.nextUrl.pathname.startsWith('/write')) {
        const session = await getToken({ req: request });
        console.log(session);
        // * 미로그인시 session이 null
        if (session == null) {
            // * 미로그인시 로그인 페이지로 redirect하는데 자바스크립트의 new URL() 인스턴스 사용, 첫번째 파라미터는 이동할 url, 두번째 파라미터는 베이스 url
            return NextResponse.redirect(new URL('/api/auth/signin', request.url));
        }
    }
    // * session 방식 사용중인 경우 직접 구현해야하는데, session 정보 들어있는 쿠키 출력해보고 DB에 있는지 조회해봐야함(유효기간이나 일치여부등)

    // * 3. 특정페이지 접속시 쿠키를 만들어보자
    // request.cookies.get('쿠키이름'); //출력
    // request.cookies.has('쿠키이름'); //존재확인
    // request.cookies.delete('쿠키이름'); //삭제

    // * 쿠키를 생성해서 response에 담아서 보내주는 방법
    // const response = NextResponse.next();
    // response.cookies.set({
    //     name: 'mode',
    //     value: 'dark',
    //     maxAge: 3600,
    //     httpOnly: true, // 자바스크립트로 쿠키 조작 방지 가능, 개발자도구에서 조작하는건 못 막음
    // });
    // return response; //쿠키생성

    // * 4. /register 페이지 방문시 visited=true 라는 쿠키를 생성해주기
    if (request.nextUrl.pathname.startsWith('/register')) {
        const visited = request.cookies.has('visited');
        const response = NextResponse.next();
        if (!visited) {
            response.cookies.set({
                name: 'visited',
                value: 'true',
                maxAge: 3600, // 초단위, 1시간
                httpOnly: true, // 자바스크립트로 쿠키 조작 방지 가능, 개발자도구에서 조작하는건 못 막음
            });
        }

        return response;
    }
}
