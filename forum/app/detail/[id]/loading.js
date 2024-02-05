// * 클라이언트 컴포넌트 페이지가 로딩되기전에 표시되는 로딩페이지인 loading.js이다.
// * <Suspense fallback={<loading><페이지 컴포넌트/></loading>}></Suspense>를 사용하면 fallback에 들어간 컴포넌트가 로딩중 페이지로 사용되는데,
// * loading.js를 만들면 위와 동일하게 작동한다. page.js와 동일 선상에 만들면 됨. 클라이언트 컴포넌트 페이지로도 됨.
// * error.js 페이지와 동일하게 현재 page.js와 동일선상에 loading.js가 없으면 상위 폴더에서 찾는다.
// * 이를 이용하여 최상위에 loading.js를 만들어두면 모든 페이지에 사용 가능

export default function Loading() {
    return <h4>로딩중!!!!!!</h4>;
}
