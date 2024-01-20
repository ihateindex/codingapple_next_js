'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    return (
        <button
            onClick={() => {
                signOut();
            }}
        >
            로그아웃
        </button>
    );
}
