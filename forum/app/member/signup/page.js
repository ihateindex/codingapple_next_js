export default function signup() {
    return (
        <div className="p-20">
            <h4>회원가입</h4>
            <form action="/api/member/signup" method="POST">
                <input type="text" name="member_id" placeholder="아이디" />
                <input type="text" name="member_password" placeholder="비밀번호" />
                <button type="submit">버튼</button>
            </form>
        </div>
    );
}
