export default function handler(요청, 응답) {
    let date = new Date();
    return 응답.status(200).json(date);
}
