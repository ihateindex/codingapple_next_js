'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DarkMode() {
    const [mode, setMode] = useState('light');
    const [cookie, setCookie] = useState('');
    let router = useRouter();
    useEffect(() => {
        setCookie(('; ' + document.cookie).split(`; mode=`).pop().split(';')[0]);
        if (cookie == '') {
            document.cookie = 'mode=light; max-age=' + 3600 * 24 * 400;
        }
        setMode(mode);
    }, []);
    return (
        <span
            onClick={() => {
                let 쿠키값 = ('; ' + document.cookie).split(`; mode=`).pop().split(';')[0];
                if (쿠키값 == 'light') {
                    document.cookie = 'mode=dark; max-age=' + 3600 * 24 * 400;
                    setMode('dark');
                } else {
                    document.cookie = 'mode=light; max-age=' + 3600 * 24 * 400;
                    setMode('light');
                }
                router.refresh();
            }}
        >
            {mode === 'light' ? ' 🌙 ' : ' ☀️ '}
        </span>
    );
}
