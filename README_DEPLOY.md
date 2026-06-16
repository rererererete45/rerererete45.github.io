# 개인 이력서 포트폴리오 v7

React Bits의 `ProfileCard`, `TrueFocus`, `TextType` 분위기를 현재 정적 GitHub Pages 구조에 맞게 재구성한 버전입니다.

## 적용 위치

### ProfileCard
- 왼쪽 프로필 사진 카드
- 마우스 이동에 따른 은은한 틸트와 글로우
- 미니 아바타, GitHub 핸들, 버튼

### TrueFocus
- 첫 화면의 `도시계획 / 데이터 분석 / GIS / 자동화`
- 단어가 순서대로 선명해지고 코너 프레임이 이동
- 마우스를 올리면 해당 단어에 일시 정지

### TextType
- 첫 화면 제목 아래의 순환 문장
- `공공데이터를 분석합니다.`
- `공간정보를 해석합니다.`
- `반복 업무를 자동화합니다.`

## React 의존성을 설치하지 않은 이유

현재 사이트는 React 프로젝트가 아니라 HTML·CSS·JavaScript 기반 GitHub Pages입니다.

따라서 다음 패키지는 설치하지 않았습니다.

```text
motion
gsap
```

대신 동일한 핵심 동작을 순수 JavaScript와 CSS로 구현했습니다. GitHub Pages에 그대로 업로드할 수 있습니다.

## 업로드 파일

```text
index.html
style.css
script.js
profile-placeholder.svg
```

실제 사진은 `profile.jpg` 이름으로 같은 위치에 추가합니다.

## 접근성

- 애니메이션 텍스트와 별도로 스크린리더용 고정 문구 포함
- 사용자가 동작 줄이기를 설정한 경우 애니메이션 자동 비활성화
- 모바일에서는 프로필 카드 틸트 비활성화
