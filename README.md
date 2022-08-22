# login-backend

## 라우터 설명

### post /signup

/signup api 는 회원가입 api 입니다. 이메일과 비밀번호를 받아서 사용자 정보를 저장합니다.

Request

```
headers: {
  Content-Type: application/json
}
body: {
  email: string,
  password: string
}
```

Response

```
201
body: {
  message: string
}
```

### post /login

/login api 는 signup 으로 만든 회원에서 로그인할 때 사용합니다. 결과로 액세스 토큰이 발급 되며 액세스 토큰은 앞으로의 api 통신에 범용적으로 사용됩니다.

Request

```
url: /login
headers: {
  Content-Type: application/json
}
body: {
  email: string,
  password: string
}
```

Response

```
200
body: {
  access_token: string
}
```

### get /me

/me api 는 토큰을 이용하여 자신의 정보를 받아올 때 사용합니다. 주로 프로필 정보등에 많이 사용하는 api 이므로 우선 postman 으로 호출 후에 JUSTGRAM 프로젝트에서 필요한 곳에 사용하여주세요!

Request

```
headers: {
  Authorization: string
}
```

Response

```
200
body: {
  id: number,
  email: string
}
```