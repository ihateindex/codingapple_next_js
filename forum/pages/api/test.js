export default function handler(요청, 응답) {
    if (요청.method === 'POST') {
        return 응답.status(200).json('처리완료');
    }
}
