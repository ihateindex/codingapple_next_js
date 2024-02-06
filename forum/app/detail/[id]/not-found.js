// * 기본적으로 Next.js는 404 페이지를 지원합니다.
// * 하지만 커스텀 404 페이지나 DB 조회를 위해 다이나믹 라우팅 값으로 아이디 값등을 넘기는 페이지에서
// * 아이디 값이 없으면 에러가 뜨는데, 이대신 없는 아이디 즉 없는 페이지임을 보여주려면 DB 조회 실패시 result가 빈 값이면 notFound()로 404 페이지를 보여주도록 할수있습니다.
// * 이 not-found.js 파일도 없으면 상위 폴더들에서 찾게 되기때문에 최상위에 만들어두면 모든 페이지에서 사용 가능합니다.

export default function Loading() {
    return <h4>404 없는 페이지임</h4>;
}