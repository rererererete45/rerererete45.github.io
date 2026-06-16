# 개인 이력서 포트폴리오 v6

현재 GitHub Pages 정적 사이트에, 사용자가 올린 React Bits `ProfileCard`의 분위기를 반영한 버전입니다.

## 중요한 점

업로드한 자료는 React 컴포넌트 설명이었습니다.
하지만 현재 포트폴리오 사이트는 React 앱이 아니라 정적 HTML/CSS/JavaScript GitHub Pages 사이트입니다.

그래서 이 버전은:

- React 컴포넌트를 그대로 붙여넣은 것이 아니라
- 현재 사이트 구조에 맞게
- 프로필 카드 영역만 React Bits 스타일로 해석·재구성한 버전입니다.

## 반영 내용

- 프로필 사진 카드에 광택 레이어 추가
- 미니 아바타 + 핸들 + GitHub 버튼 추가
- 은은한 글로우 효과 추가
- 데스크톱에서 마우스를 움직이면 카드가 살짝 기울어지는 효과 추가
- 전체 포트폴리오의 차분한 이력서형 디자인은 유지

## 파일 구성

```text
index.html
style.css
script.js
profile-placeholder.svg
```

## 프로필 사진 넣기

사용할 사진 파일명을 정확히 `profile.jpg`로 바꿔서 같은 위치에 올립니다.

```text
rerererete45.github.io/
├─ index.html
├─ style.css
├─ script.js
├─ profile-placeholder.svg
└─ profile.jpg
```

`profile.jpg`가 없으면 기본 자리표시 이미지가 보입니다.

## 업로드 방법

기존 저장소에서 다음 파일을 교체합니다.

```text
index.html
style.css
script.js
profile-placeholder.svg
```

그리고 실제 프로필 사진 파일 `profile.jpg`를 추가합니다.
