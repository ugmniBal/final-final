# REVO 챗봇 with Firebase Logging

이 프로젝트는 OpenAI GPT API와 Firebase 실시간 데이터베이스를 활용한 친환경 분리배출 챗봇입니다.

## 실행 방법

1. `.env`에 GPT 키 설정 (`OPENAI_API_KEY`)
2. `firebase-adminsdk.json` 파일을 프로젝트 루트에 추가
3. `server.js`에서 Firebase `databaseURL` 수정
4. 실행:

```bash
npm install express cors node-fetch dotenv firebase-admin
node server.js
```

## 배포 방법

Vercel에 업로드 → 환경 변수 입력 → 자동 배포
