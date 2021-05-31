# 코로나19 확찐자 운동관리 - PT [Demo]

## 충북대학교 소프트웨어학과 캡스톤디자인 프로젝트

  <div><h3>
    &#127939;실시간 1:1 PT 서비스 기반
    실내 운동 트레이닝 및 건강관리 모바일 앱
  </h3></div>
<br/>

[TEAM REPOSITORY](https://github.com/Team-RELIFE)

[ANDROID APP FOR TRAINEE](https://github.com/Team-RELIFE/covidExerciseAndroid)

[ANDROID APP FOR TRAINER](https://github.com/Team-RELIFE/CovidExerciseAndroid_trainer)

<br>

## 🎨 Overview

코로나19 확찐자 운동관리 프로젝트의 주요 기능 **실시간 화상 PT** Prototype <br><br>

## 👨‍💻 Prerequisites

- [Docker](https://github.com/docker)
- [Ionic/Angular](https://github.com/ionic-team/ionic-framework/tree/master/angular)
- [Node.js](https://github.com/nodejs/node)

<br>

## 🚀 Functions

1. 공유 세션 입장 및 퇴장
   - 특정 세션에 입장하여 통화에 참여할 수 있다.
   - 참여중인 통화에서 퇴장할 수 있다.
2. 카메라, 마이크 설정
   - 공유 세션 입장 전, 본인의 카메라 화면을 미리 확인할 수 있다.
   - 사용 가능한 마이크와 캠코더 목록을 확인하고 선택할 수 있다.
   - 마이크와 캠코더를 켜지 않은 상태로 입장할 수 있다.
3. 통화중 옵션
   - 전면 카메라-후면 카메라 화면을 전환할 수 있다.
   - 마이크를 활성화/비활성화할 수 있다.
   - 카메라를 활성화/비활성화할 수 있다.
   - 특정 통화 상태 혹은 자신의 카메라 화면을 확대할 수 있다.
4. 단체 채팅
   - 채팅 메시지를 송신/수신할 수 있다.
   - 채팅 화면을 활성화/비활성화할 수 있다.
   - 채팅 화면이 비활성화 상태일 때 메시지가 수신되면, 채팅 아이콘 색이 변화되어 표시된다.
     <br><br>

## 📑 Architecture Diagram<br>

1. 전체 시스템<br>

<img src="src\assets\images\architecture.jpg" width="600px"  /><br><br>

2. 실시간 화상 PT 시스템<br>

<img src="https://github.com/ByeonYujin/web_demo/blob/master/src/assets/openvidu-call-ionic-diagram.png?raw=true" width="600px"  /><br><br>

## 🤙 Run

1. 소스코드 다운로드
   <br><pre><code>git clone https://github.com/Team-RELIFE/web_demo.git</code></pre>
2. docker 실행 (localhost 기준)

- 4443, OPENVIDU_SECRET : REST API를 위한 서버 포트번호와 암호
  <br><pre><code>docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET -e openvidu/openvidu-server-kms:2.17.0
  </code></pre>

3. Web Frontend 실행
   <br><pre><code>ionic serve
   </code></pre>
4. localhost:8100 접속
