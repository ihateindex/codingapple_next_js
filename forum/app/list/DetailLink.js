'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function DetailLink() {
    let router = useRouter();
    // * 현재 url을 가져오는 함수
    let pathName = usePathname();
    // * 쿼리스트링 가져오는 함수
    let searchParams = useSearchParams();
    console.log(pathName);
    console.log(searchParams.toString());
    return (
        <button
            onClick={() => {
                router.back();
            }}
        >
            버튼
        </button>
    );
}
