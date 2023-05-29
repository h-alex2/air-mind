# Air Mind 💡

<div align="center">
  <img src="./public/images/air_mind_logo.png" alt="airmind-logo" width="200px" height="200px" />
</div>

[Air Mind](https://aoa.air-mind.live/)
는 아이디어를 쉽게 분류할 수 있는 마인드맵을 만들 수 있는 웹사이트입니다.  
주소를 공유하여 실시간으로 다른 유저들의 작업 상황을 확인하며 소통할 수 있어 아이디어 공유 및 협업이 가능하고, 작업의 생산성을 높일 수 있습니다.

- [Frontend Repository](https://github.com/Team-AOA/air-mind)
- [Backend Repository](https://github.com/Team-AOA/air-mind-server)

<br />

## Table of contents

<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [Motivation](https://github.com/h-alex2/air-mind/#motivation)
- [Build Status](https://github.com/h-alex2/air-mind/#build-status)
- [Service Demo](https://github.com/h-alex2/air-mind/#service-demo)
- [Challenges](https://github.com/h-alex2/air-mind/#challenges)
  - [마인드맵 노드 데이터 관리](https://github.com/h-alex2/air-mind/#마인드맵-노드-데이터-관리)
    - [트리 자료 구조로 노드 데이터 구성하기](https://github.com/h-alex2/air-mind/#트리-자료구조로-노드-데이터-구성하기)
    - [트리 자료 구조를 통해 서버 통신 최소화](https://github.com/h-alex2/air-mind/#트리-자료-구조를-통해-서버-통신-최소화)
    - [한 번에 전송받을 수 있는 노드 데이터의 수 제한하기](https://github.com/h-alex2/air-mind/#한-번에-전송받을-수-있는-노드-데이터의-수-제한하기)
  - [마인드맵 시각화](https://github.com/h-alex2/air-mind/#마인드맵-시각화)
    - [D3를 이용해 SVG 제어하기](https://github.com/h-alex2/air-mind/#d3를-이용해-SVG-제어하기)
    - [노드와 노드 간의 연결 구현하기](https://github.com/h-alex2/air-mind/#노드와-노드-간의-연결-구현하기)
    - [마인드맵 노드 Depth 설정하기](https://github.com/h-alex2/air-mind/#마인드맵-노드-depth-설정하기)
    - [노드 생성 위치 정하기](https://github.com/h-alex2/air-mind/#노드-생성-위치-정하기)
  - [Next.js의 Hydration Error 해결](https://github.com/h-alex2/air-mind/#nextjs의-hydration-error-해결)
  - [Socket I.O를 이용한 실시간 협업 기능 구현](https://github.com/h-alex2/air-mind/#socket-io를-이용한-실시간-협업-기능-구현)
    - [데이터 공유 최적화하기](https://github.com/h-alex2/air-mind/#데이터-공유-최적화하기)
    - [Socket I.O와 Recoil간의 Freeze 이슈](https://github.com/h-alex2/air-mind/#socket-io와-recoil간의-freeze-이슈)
  - [Formdata를 활용한 이미지전송](https://github.com/h-alex2/air-mind/#formdata를-활용한-이미지전송)
    - [파일 드래그 기능으로 사용자 편의성 높이기](https://github.com/h-alex2/air-mind/#파일-드래그-기능으로-사용자-편의성-높이기)
  - [Git merge commit 전략 도입](https://github.com/h-alex2/air-mind/#git-merge-commit-전략-도입)
- [Idea Brainstorming & Planning](https://github.com/h-alex2/air-mind/#idea-brainstorming-planning)
- [Development](https://github.com/h-alex2/air-mind/#development)
- [Tech/Framework used](https://github.com/h-alex2/air-mind/#techframework-used)
- [Retrospective](https://github.com/h-alex2/air-mind/#retrospective)

<!-- /TOC -->

# Motivation

처음 시작은 게시글과 태그를 마인드맵으로 연결하는 새로운 타입의 블로그를 만들어보면 어떨까? 라는 생각으로 시작하게 되었습니다. 이 아이디어를 발전시키는 과정에서 한 사람만을 위한 것이 아닌, 많은 유저가 함께 마인드맵을 사용하면서 협업할 수 있으면 더 좋을 것 같다는 생각에 협업 마인드맵을 기획하게 되었습니다. 실시간으로 공유할 수 있다는 의미를 담기 위해 “Air” 라는 이름을 담아 “Air Mind”라는 이름을 지었습니다.

<br />

# Build Status

- 클라이언트: Netlify
- 백엔드: Aws Beanstalk
- [배포 사이트로 이동합니다.](https://aoa.air-mind.live/)

<br />

# Service Demo

<p align="center">
  <img src="https://github.com/Team-AOA/air-mind/assets/84281505/234c6751-2fbc-4946-b731-da820c068a5d" alt="demo" />
  <p align="center">
    <ul>
      <li>유저가 위치하고 있는 노드에 유저 아이콘 표시</li>
      <li>방해받기 금지 모드를 통해 다른 유저 노드 fold 이벤트 적용되지 않는 기능</li>
      <li>댓글 기능을 이용하여 실시간 채팅 기능</li>
    </ul>
  </p>
</p>

<details>
  <summary>Demo 자세히 확인하기</summary>

  <p align="center">
    <img src="https://github.com/Team-AOA/air-mind/assets/84281505/4f0a0313-b591-415a-a2fa-d8d436b55e7a" alt="demo" />
    <p align="center">
      <ul>
        <li>Public 버전 마인드맵 리스트 확인</li>
        <li>마인드맵 페이지 썸네일 확인 기능</li>
        <li>로그인하지 않으면 Public 버전의 모든 마인드맵 확인 가능</li>
        <li>로그인하지 않으면 마인드맵 수정 불가능, 노드 제목, 내용 등 확인만 가능</li>
        <li>메인에서 본인이 만든 마인드맵이라면 이름 수정, 삭제 가능</li>
      </ul>
    </p>
  </p>

  <br />

  <p align="center">
    <img src="https://github.com/Team-AOA/air-mind/assets/84281505/d7a2fcdb-02be-4997-8f98-d7ff716ad0c0" alt="demo" />
    <p align="center">
      <ul>
        <li>유저 본인이 만든 전체 마인드맵 리스트 확인</li>
        <li>시간순으로 정렬</li>
        <li>Private 버전, Public 버전 모두 확인 가능</li>
        <li>마인드맵 이름 수정, 삭제 가능</li>
      </ul>
    </p>
  </p>
  <br />

  <p align="center">
    <img src="https://github.com/Team-AOA/air-mind/assets/84281505/a7beff3b-18ee-47ee-942b-6fed8560863b" alt="demo" />
    <p align="center">
      <ul>
        <li>노드 타이틀, 내용 입력 기능, 사진 추가(드래그 또는 선택) 기능, 사진 삭제 기능</li>
      </ul>
    </p>
  </p>
  <br />

  <p align="center">
    <img src="https://github.com/Team-AOA/air-mind/assets/84281505/c55ddd60-41f7-435f-9e66-f3f9b4864987" alt="demo" />
    <p align="center">
      <ul>
        <li>다른 유저의 노드(마인드맵을 이루는 박스) 색상 변경, 사이즈 변경, 노드 추가, 노드 삭제 모두 실시간으로 확인 가능</li>
        <li>자식 노드 안 보이게 fold 하는 기능</li>
      </ul>
    </p>
  </p>
  <br />

</details>

<br />

# Challenges

## 마인드맵 노드 데이터 관리

마인드맵을 구성하는 Node 데이터의 구조를 결정하는 과정에서 많은 고민을 하게 되었습니다. 초기에는 단순하게 평면적인 접근을 고려했지만, 데이터의 확장성 측면에서 한계가 있다는 것을 깨닫고 스키마 제작과 데이터 구성에 더 많은 시간을 투자하게 되었습니다.

<br />

### 트리 자료 구조로 노드 데이터 구성하기

저희는 마인드맵 내의 노드 데이터 구조로 트리 자료구조를 선택했습니다.
마인드맵은 “중심 주제”라는 하나의 특정 노드에서 시작해 가지 형태로 계층 구조를 형성하며 뻗어 나가는 형태입니다. 이렇게 계층 구조를 형성하며 데이터가 구성되는 형식에는 트리 자료구조가 적합하다고 판단했습니다.

마인드맵은 무한히 많은 노드들로 확장될 수 있습니다. 하나의 마인드맵 데이터 안에 모든 노드 데이터가 들어가는 형식이라면, 확장 될수록 점점 무거워질 것이라 생각했습니다. 그 부분을 방지하기 위해서 노드와 마인드맵의 관계를 약화시키고 노드와 노드 간의 관계를 중심으로 데이터를 관리하고자 하였습니다.

<div align="center">
  <img src="https://github.com/Team-AOA/air-mind/assets/84281505/f772c7e4-4d5f-4554-922f-9d35a85e3d0c" alt="airmind-logo"  />
</div>

마인드맵은 가장 최상위 노드의 정보만을 보유하고, 그 이후로는 부모 노드와 자식 노드가 서로의 정보를 보유하는 양방향 1:N 트리 구조로 설정하게 되었습니다.

<br />

### 트리 자료 구조를 통해 서버 통신 최소화

트리 방식의 노드 구조는 서버와의 통신을 최소화할 수 있다는 장점이 있습니다. 마인드맵 페이지를 로드할 때, 최상위 노드인 headNode의 ID를 기반으로 자식 노드를 모두 가져올 수 있기 때문에, 페이지에 접속할 때 한 번의 데이터 요청(fetch)으로 모든 노드 데이터를 받아올 수 있었습니다.

데이터를 받아온 후 각각의 노드 데이터의 업데이트 또는 생성 작업 시 하나의 요청만 보내면 되기 때문에 좀 더 효율적으로 서버와의 통신을 처리할 수 있었습니다.

저희는 모든 노드 데이터를 State에 저장하고, 각 노드 데이터의 업데이트 또는 생성 작업의 서버 통신 작업을 처리한 후에는 노드 데이터가 저장된 State도 함께 업데이트하며 최소한의 요청만을 서버로 보내는 것을 중점적으로 작업했습니다.

<br />

### 한 번에 전송받을 수 있는 노드 데이터의 수 제한하기

<div align="center">
  <img src="https://github.com/Team-AOA/air-mind/assets/84281505/ecc3b645-a095-4134-908d-7be928d01a90" alt="airmind-logo" width="400"  />
</div>

마인드맵의 노드가 많아질 수 있다는 상황을 가정하고 나니, 굉장히 많은 노드 데이터를 가져올 때 서버에 미칠 영향의 가능성을 생각하게 되었습니다. 그래서 저희는 모든 데이터를 가져오는 것 보다 노드 수를 50개로 제한하고 노드의 깊이 또한 5로 제한하는 방식으로 작업하게 되었습니다.

깊이를 제한해야 하기 때문에 한 레벨씩 탐색할 수 있는 BFS 탐색 방법을 선택하였습니다. 반복문 내의 배열 메서드 사용으로 인해 On^2이라는 시간복잡도가 부담이었지만, 나머지 탐색을 위해 `Promise.all`을 사용해 병렬적으로 처리하면서 고민했던 부분을 조금이나마 해소하려 노력하였습니다.

데이터가 가져와 지지 않은 노드의 경우 위 사진의 `+` 버튼을 클릭하여 데이터를 가져올 수 있도록 작업했습니다.

<br />

## 마인드맵 시각화

마인드맵은 자유롭게 크기 조절이 가능해야 하기 때문에, 스케일이 커져도 화질이 깨지지 않는 벡터 기반의 그래픽 형식인 SVG를 선택해 마인드맵을 시각화하게 되었습니다.

<br />

### D3를 이용해 SVG 제어하기

SVG 엘리먼트를 이용해 노드의 움직임을 구현하고, 노드 간 연결을 구현하기 위해 처음 POC단계에서 적용해봤던 것은 다음 세 가지입니다.

- 직접 SVG 제어
- React tree graph 라이브러리를 이용해 구현
- `React.ref`를 이용해 D3와 연결하여 SVG 제어

처음으로는 직접 SVG를 제어하는 방식으로 시도해보았습니다. SVG 엘리먼트를 처음 다뤄보면서 좌표값을 설정하는 부분에서만 많은 시간을 보내게 되었습니다. viewBox 설정을 해 적용했지만 SVG가 잘려 보이는 상황이 생겼고, 직접 제어하는 방법으로는 시간 내에 POC를 완료할 수 없을 것 같아 라이브러리를 도입하는 걸 고려하게 되었습니다.

두 번째로는 [React tree graph](https://jpb12.github.io/tree-viewer/) 라이브러리를 통해 적용해보았습니다. React tree graph 라이브러리는 라인의 경우도 이미 연결되어 있는 완성형 마인드맵 라이브러리이기 때문에, 저희가 커스텀할 수 있는 여지가 거의 없고, 방향성을 설정하는 부분도 좌, 우 방향으로 한정되어 있다는 단점이 있어 D3를 알아보게 되었습니다.

D3 라이브러리로는 SVG 좌표값을 설정할 수 있는 부분이 용이하다는 장점이 있었습니다. 툴에 완전히 의존하지 않고 좌표값만을 다루는 부분만 사용하고 스타일링 등 다른 요소는 저희가 하고 싶은 대로 적용할 수 있다는 장점이 저희의 상황과 맞아 D3 라이브러리를 사용하게 되었습니다.

D3를 이용하게 되면, 직접적으로 DOM을 조작할 수 있게 됩니다. 하지만 직접적으로 DOM을 조작한다면 가상돔을 사용하는 React의 Lifecycle에 맞춰 DOM 엘리먼트를 가져오지 못하는 등 데이터를 어디서 어떻게 조작하고 있는지 React가 예측할 수 없는 문제가 발생할 수 있습니다. 그래서 저희는 React의 요소를 이용해 돔을 제어할 수 있는 방법인 `useRef`를 이용해 접근하는 방식을 선택했습니다.

<br />

### 노드와 노드 간의 연결 구현하기

<div align="center">
  <img width="471" alt="image" src="https://github.com/Team-AOA/air-mind/assets/84281505/1a29a4dd-9a35-4fbb-9efc-2169a8457ced">
</div>

마인드맵을 생성하면 먼저 최상단의 노드가 하나 먼저 생성되게 됩니다. 그 노드로부터 새로운 노드를 생성할 수 있게 됩니다. 노드와 노드를 연결하려면 간단하게 새롭게 생성되는 노드가 원래 있던 노드로부터 선으로 연결되어야 하니 선과 노드를 한 쌍으로 생성하는 방식으로 작업하였습니다.

```js
function NodeWithLine() {
  const lineRef = useRef();
  const line = d3.select(lineRef.current);

  const parentCenter = [
    parentX + parentWidth / 2,
    parentY + parentHeight / 2,
  ];
  const childCenter = [
    childX + childWidth / 2,
    childY + childHeight / 2
  ];

  line
    .attr('x1', parentCenter[0])
    .attr('y1', parentCenter[1])
    .attr('x2', childCenter[0])
    .attr('y2', childCenter[1]);


  return (
    <line ref={lineRef} style={{ stroke: 'red' }} />
    <Node />
  );
}
```

`parentCenter`와 `childCenter` 라는 x축, y축의 중앙값이 담긴 데이터를 line의 속성으로 설정해 라인을 부모와 자식노드를 연결할 수 있도록 설정했습니다.

<br />

### 마인드맵 노드 Depth 설정하기

SVG 데이터를 다루며 기존의 엘리먼트와 다른 방식으로는 렌더링하는 순서였습니다. 처음 접근 방식으로는 css를 이용해 depth를 설정하려 했지만, SVG 엘리먼트는 렌더링 되는 방식 자체가 다르다는 것을 알게 되었습니다. SVG 엘리먼트는 루트 요소부터 렌더링 되기 시작해 제일 밑에 있는 엘리먼트가 제일 최상단의 depth를 가지게 되는 구조입니다. 보통의 엘리먼트와는 정 반대의 렌더링 순서를 가지고 있습니다.

<div align="center">
  <img width="471" alt="image" src="https://github.com/Team-AOA/air-mind/assets/84281505/2414c7a4-3773-4856-ad9e-2e8cd05ebcca">
</div>

마인드맵 노드의 Depth라면 루트 노드인 최상단 노드가 제일 높은 Depth를 가지고 계층이 낮아질수록 Depth가 작아지게 하는 것이 자연스러울 것이라 생각해, 루트 노드와 멀수록 엘리먼트를 먼저 위치하는 방식으로 노드 컴포넌트 순서를 조절했습니다.

<br />

### 노드 생성 위치 정하기

<div align="center">
  <img width="614" alt="image" src="https://github.com/Team-AOA/air-mind/assets/84281505/719e1bb6-f1f2-4f24-a1a4-a26f931ef200">
</div>

생성될 노드의 좌표를 구하기 위해서 저희는 루트 노드의 좌표와 생성될 노드의 부모 노드의 위치를 이용하는 방법을 적용하게되었습니다. 방법은 다음과 같습니다.

```js
const diffX = nodeCenterX - rootNodeCenterX;
const diffY = nodeCenterY - rootNodeCenterY;

increaseX =
  150 * (diffX / Math.sqrt(diffX ** 2 + diffY ** 2)) -
  NODE_SIZE.MEDIUM.width / 2;

increaseY =
  150 * (diffY / Math.sqrt(diffX ** 2 + diffY ** 2)) -
  NODE_SIZE.MEDIUM.height / 2;

const cordX = nodeCenterX + increaseX;
const cordY = nodeCenterY + increaseY;
```

diff라는 루트 노드와 노드와의 상대 거리를 구한 후 제곱 후, 다시 제곱근을 계산하는 방식으로 적용했습니다. 제곱과 제곱근을 이용해 새로 생성될 노드가 루트의 좌, 우의 위치 상관없이 같은 각도의 좌표를 구할 수 있게 되었습니다.

<br />

## Next.js의 Hydration Error 해결

Next.js를 적용하면서 Hydration Error가 많이 발생하게 되었습니다. 마인드맵 데이터를 가져오는 컴포넌트에서 가장 많은 에러가 발생하게 되었는데, 확인해보니 마인드맵 구현에 필요한 D3 라이브러리가 원인이었습니다. ssr시점에는 라이브러리가 로드되지 않아 React 트리가 DOM의 동기화 문제로 발생했던 것이 문제였습니다. 이를 해결하기 위해 ssr을 사용하는 컴포넌트와 csr을 사용하는 컴포넌트를 분리하게 되었습니다.

```js
const NodeCanvas = dynamic(() => import('../nodecanvas'), {
  ssr: false,
});
```

ssr을 사용하지 않는 컴포넌트는 동적 import를 이용해 ssr을 false로 설정하여 csr만 사용하는 설정을 통해 csr 설정을 적용했습니다.

<br />

## Socket I.O를 이용한 실시간 협업 기능 구현

Air-mind 는 일반적인 마인드맵과 달리 실시간 협업이 가능한 서비스로서의 기능을 갖추기 위해 [Socket.io](http://socket.io/) 를 도입하게 되었습니다.

<br />

### 데이터 공유 최적화하기

Socket.io 의 구현에 가장 신경을 쓴 부분은 전송하는 데이터의 최소화였습니다. 예를 들어 노드의 위치를 변경하는 경우 실시간 좌표 변경은 공유하지 않고 최종적으로 이동한 위치만 공유하였습니다. 또한, 변경되는 데이터를 포함한 모든 데이터를 전송하지 않고, 노드의 위치, 크기, 색상, 타이틀, 내용 등 변경되는 각각의 데이터만 전송하되, 전송 시 사용하는 채널을 구분함으로써 데이터를 받는 쪽에서 어떤 데이터를 변경하는 것인지 알 수 있도록 하였습니다.

<br />

### Socket I.O와 Recoil간의 Freeze 이슈 해결하기

한 가지 구현상 이슈가 발생한 것은 여러 컴포넌트에서 동일한 socket 객체를 공유하는 것이었습니다. 동일한 socket 객체로부터 위치, 크기, 색상 등 모든 정보의 전송을 처리하고 싶었지만, 각 컴포넌트가 분산되어 있어서 컴포넌트의 prop으로 객체를 전달하기 어려웠습니다. 이로 인해 저희는 socket 객체를 전역 변수로 관리하기 위해 recoil을 사용하려고 했습니다. 그러나 recoil은 상태 객체를 불변하게 유지하기 위해 내부적으로 freeze 처리를 하기 때문에 "Cannot Freeze"라는 에러가 발생했습니다.

<div align="center">
  <img width="400" alt="image" src="https://github.com/Team-AOA/air-mind/assets/84281505/dc14d3bd-85e9-4b12-9551-0194322f8be1">
</div>

Recoil은 상태를 관리하며 상태의 불변성을 보장하기 위해 내부적으로 상태 객체를 freeze시키지만 mutable한 Socket 객체 데이터를 넣음으로써 불변성을 보장하지 못해 Cannot Freeze라는 에러가 발생하게 됐던 것입니다.

이 문제를 해결하기 위해서는 recoil의 `dangerouslyAllowMutability` 옵션을 사용하여 객체를 불변하지 않게 처리할 수 있었습니다. 하지만 recoil은 상태의 불변성을 중요시하는 상태 관리 도구이기 때문에 mutable한 객체를 사용하는 것이 과연 옳은가 라는 의문이 들게 됐습니다. 따라서 저희는 이후에 다른 방법을 고려하게 되었고, 모듈로 socket 객체를 분리하는 방법을 추후에 적용하게 되었습니다.

<br />

## Formdata를 활용한 이미지전송

마인드맵 노드 내에는 이미지를 저장하는 기능이 있습니다. 기능을 구현하기 위해 생각했던 방법으로는 3가지가 있었습니다.

- base64로 인코딩 후 서버에 전달하는 방법
- 클라이언트 단에서 모두 처리하는 방법
- 서버로 데이터를 보낸 후 처리하는 방법

첫 번째 방법인 base64로 인코딩하여 파일 자체를 DB에 저장하는 방법으로는 인코딩 시 용량이 33프로 늘어나게 되기 때문에, 비효율적인 방법이 될 것이라 생각하여 다른 방법을 찾게 되었습니다.

다음으로는 클라이언트에서 `aws-sdk`를 사용해 바로 S3 버킷에 저장하는 방법을 생각해봤지만, 클라이언트에서 aws의 key를 저장하게 된다면 bundle에 노출될 수도 있는 등 보안 적으로 좋지 않을 수 있다고 생각하게 되었습니다.

그래서 저희는 서버에서 `aws-sdk`와 `express multer`를 이용한 방법으로 이미지 전송을 처리하는 방식을 선택했습니다.

<br />

### 파일 드래그 기능으로 사용자 편의성 높이기

이미지 전송 기능으로는 이미지 파일을 바로 드래그하는 기능을 추가해 사용자 편의성을 높일 수 있도록 구성해봤습니다.

input 내의 `accept`로 파일 확장자로 이미지 파일 형식만을 설정하고 `multiple` 옵션을 통해 여러 개의 파일을 업로드 할 수 있도록 적용했습니다.

```js
const handleOnImgDropZone = e => {
  e.preventDefault();
  e.stopPropagation();
};

const handleOffImgDropZone = e => {
  e.preventDefault();
  e.stopPropagation();
};

const handleDrop = async e => {
  // formdata 전송 로직
}

//...

<ImageDropArea
  onDragEnter={handleOnImgDropZone}
  onDragOver={handleOffImgDropZone}
  onDragLeave={handleOnImgDropZone}
  onDrop={handleDrop}
>
```

Drag 이벤트가 일어나게 되면, 총 4개의 이벤트가 발생하게 됩니다.

- `onDragEnter`
- `onDragOver`
- `onDragLeave`
- `onDrop`

Drag and Drop 기능으로는 `onDrop` 이벤트만 사용해야 하므로 다른 이벤트에 대해서는 `e.preventDefault()` 설정으로 브라우저 기본 이벤트를 방지하였고, `e.stopPropagation()` 설정으로 이벤트 추가 전파를 방지하는 설정을 적용해주었습니다.

<br />

## Git merge commit 전략 도입

이번 프로젝트에서 처음으로 git merge 전략을 도입해보았습니다.

1. squash merge : 이전 커밋으로 되돌아갈 때 개별 커밋에 접근하기 힘들다는 단점으로 인해 배제
2. merge commit
3. rebase merge

이렇게 저희는 2번 merge commit 방식과 3번 rebase merge 방식 중에 고민하게 되었습니다. 팀 프로젝트에서 버전을 명확하게 구분하고 추적하기 쉬운 방법이 필요하다고 판단하여, no fast-forward 방식의 merge commit 전략을 도입하게 되었습니다.

저희가 했던 방법으로는 아래와 같습니다.

- 각자 브랜치를 생성하고 작업 후 커밋합니다.
- Pull Request를 생성하고 해당 브랜치를 development 브랜치로 Merge합니다.
- 각자 작업하던 브랜치에서 development 브랜치로 `git rebase development` 명령을 실행합니다.
- 충돌(conflict)이 발생하면 GUI 또는 CLI를 사용하여 충돌을 해결합니다.

  [함께 학습한 자료입니다.](https://www.notion.so/Git-Merge-91df61f27d7c4d8eafba5684418ec0a4)

<div align="center">
  <img width="1042" alt="image" src="https://github.com/Team-AOA/air-mind/assets/84281505/efae0898-bf44-4abe-ac11-af9112fb3cf1">
</div>

작업하는 컴포넌트가 겹치는 경우가 많아 conflict가 많이 발생하게 되었지만, 저희는 함께 문제를 해결하기 위해 git에 대해 논의하고 학습하는 과정을 많이 거치게 되었습니다. 초반에는 conflict가 두려웠지만, 프로젝트 후반 상황에서는 conflict가 상황을 더 명확하게 해주는 기능으로 여겨지게 되었습니다. 이 과정에서 많은 것을 학습하고, 초기에 전략을 설정함으로써 안정적인 협업을 이룰 수 있었습니다.

<br />

# Schedule

## Idea Brainstorming & Planning

- 2022.10.10 ~ 22.10.17
  - 아이디어 수집 및 기획
  - 구현 가능 여부 사전 조사, 기술 스택 검증, Mockup 작업

## Development

- 2022.10.18 ~ 2022.10.28
  - 개발 진행
  - 마무리 (버그 수정 및 배포)

<br />

# Tech/Framework used

  <table>
    <tr>
      <th colspan="2">Frontend</th>
      <th colspan="2">Backend</th>
    </tr>
    <tr align="center">
      <td>NextJS</td>
      <td><img src="https://img.shields.io/badge/npm-12.3.1-blue" alr="nextjs-version" /></td>
      <td>Express</td>
      <td><img src="https://img.shields.io/badge/npm-4.16.1-blue" alr="nextjs-version" /></td>
    </tr>
    <tr align="center">
      <td>Recoil</td>
      <td><img src="https://img.shields.io/badge/npm-0.7.6-blue" alr="nextjs-version" /></td>
      <td>Mongoose</td>
      <td><img src="https://img.shields.io/badge/npm-6.6.5-blue" alr="nextjs-version" /></td>
    </tr>
    <tr align="center">
      <td>Styled Compontents</td>
      <td><img src="https://img.shields.io/badge/npm-5.3.6-blue" alr="nextjs-version" /></td>
      <td>Mongoose-autopopulate</td>
      <td><img src="https://img.shields.io/badge/npm-0.16.1-blue" alr="nextjs-version" /></td>
    </tr>
    <tr align="center">
      <td>Socket.io-client</td>
      <td><img src="https://img.shields.io/badge/npm-4.5.3-blue" alr="nextjs-version" /></td>
      <td>Socket.io</td>
      <td><img src="https://img.shields.io/badge/npm-4.5.3-blue" alr="nextjs-version" /></td>
    </tr>
    <tr align="center">
      <td>Firebase Authentication</td>
      <td><img src="https://img.shields.io/badge/npm-9.12.1-blue" alr="nextjs-version" /></td>
      <td>multer</td>
      <td><img src="https://img.shields.io/badge/npm-1.4.5-blue" alr="nextjs-version" /></td>
    </tr>
  </table>

<br />

# Code Style

- ES Lint airbnb 룰을 적용했습니다. (`"extends": ["airbnb", "plugin:prettier/recommended"]`) code formatter로는 prettier를 사용했습니다.
  husky pre-commit 기능을 사용하여 커밋 전에 린트 속성에 어긋나지 않는지 검사하는 작업을 추가로 진행하였습니다.
- 컴포넌트 선언 시 함수 선언식을 사용하였고 그 외에는 함수 표현식을 사용했습니다.
- 전반적인 CSS 스타일은 NHN 컨벤션을 적용하였습니다.

<br />

# Installation

<details>
  <summary> Frontend </summary>

1. 프로젝트를 다운 받은 후 프로젝트 디렉토리 내부에서 다음 명령어를 입력합니다.

```sh
npm install
```

2. 디렉토리 root 위치에 .env 파일을 생성하여 환경설정을 입력합니다.

```sh
NEXT_PUBLIC_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<YOUR_FIREBASE_MESSAGING_SENDER_ID>
NEXT_PUBLIC_FIREBASE_APP_ID=<YOUR_FIREBASE_APP_ID>

NEXT_PUBLIC_BASE_URL=<YOUR_FIREBASE_BASE_URL>
NEXT_PUBLIC_CLIENT_URL=<YOUR_CLIENT_URL>
```

3.

```sh
npm start
```

<br />

</details>

<details>
  <summary> Backend </summary>

1. 프로젝트를 다운 받은 후 프로젝트 디렉토리 내부에서 다음 명령어를 입력합니다.

```sh
npm install
```

2. 디렉토리 root 위치에 .env 파일을 생성하여 환경설정을 입력합니다.

```sh
MONGO_DB=<YOUR_MONGO_DB_ADDRESS>
CLIENT_URL=<YOUR_CLIENT_URL>

CLOUD_END_POINT=<YOUR_CLOUD_END_POINT>
CLOUD_REGION=<YOUR_CLOUD_REGION>
CLOUD_ACCESS_KEY=<YOUR_CLOUD_ACCESS_KEY>
CLOUD_SECRET_KEY=<YOUR_CLOUD_SECRET_KEY>

FIREBASE_SERVICE_KEY_TYPE=<YOUR_FIREBASE_SERVICE_KEY_TYPE>
FIREBASE_SERVICE_PROJECT_ID=<YOUR_FIREBASE_SERVICE_PROJECT_ID>
FIREBASE_SERVICE_PROJECT_KEY_ID=<YOUR_FIREBASE_SERVICE_PROJECT_KEY_ID>
FIREBASE_SERVICE_PRIVATE_KEY=<YOUR_FIREBASE_SERVICE_PRIVATE_KEY>
FIREBASE_SERVICE_CLIENT_EMAIL=<YOUR_FIREBASE_SERVICE_CLIENT_EMAIL>
FIREBASE_SERVICE_CLIENT_ID=<YOUR_FIREBASE_SERVICE_CLIENT_ID>
FIREBASE_SERVICE_AUTH_URI=<YOUR_FIREBASE_SERVICE_AUTH_URI>
FIREBASE_SERVICE_TOKEN_URI=<YOUR_FIREBASE_SERVICE_TOKEN_URI>
FIREBASE_SERVICE_AUTH_PROVIDER_URL=<YOUR_FIREBASE_SERVICE_AUTH_PROVIDER_URL>
FIREBASE_SERVICE_CLIENT_URL=<YOUR_FIREBASE_SERVICE_CLIENT_URL>
```

- CLOUD : Naver Cloud Object storage S3 관련 변수들 입니다.
- FIREBASE_SERVICE_KEY: firebase server key를 받게 되면 저 부분이 나뉘어 있지 않고 한 파일에 모여 있습니다. aws beanstalk 배포를 했을 때 문제가 생겨 하나의 파일을 분리하게 되었습니다. 한 파일에 있는 부분을 저 양식에 맞게 분리해서 사용해야 합니다.

3.

```sh
npm start
```

</details>

<br />

## Retrospective

<details>
  <summary>임태근 Contact: ltg0513@gmail.com</summary>

부트캠프 기간 동안 과제나 시험을 치르면서 몇 가지 서비스를 만들어 보았지만, 이번 팀 프로젝트에서 만든 서비스만큼의 완성도를 지닌 것은 없었습니다. 투입한 시간도 차이가 있지만, 무엇보다 차이가 큰 것은 여러 사람이 서로의 관심사와 중요도를 서로 소통하며 어떤 기능을 우선으로 구현할지 지속적인 논의를 했다는 점이라고 생각하며, 또한 각자가 잘할 수 있는 부분을 우선으로 구현하였기에 두루 빠짐이 없이 일정 수준 이상의 완성도를 가졌다는 것도 중요한 것 같습니다. 마지막으로 무엇보다도 중요한 것은, 팀원들과 제가 서로 보완적으로 서로의 빈틈을 메꿔주었다는 것입니다. 제가 어떤 에러에 맞닥뜨려 진행이 되지 않을 때 팀원들이 검색해서 알려주거나 기존에 알고 있던 것을 저에게 알려주어 쉽게 해결하였고, 조금 지치고 확신이 없을 때 다른 팀원이 힘차게 구현해 나가는 것에서 다시 기분을 전환하고 힘을 얻을 수 있었던 경험이 쌓이면서 확신하게 되었습니다.

프로젝트 초 중기, 서로 생각하는 바가 일치하지 않고 지향하는 목표가 달라, 논의를 계속하면서도 완전히 만족스럽거나 즐겁지만은 않았습니다. 논의도 결정도 더뎌지면서 여러 사람이 모여도 효율적으로 일하기는 어렵겠다고 생각했지만, 서로 얼마간 양보하면서 명확한 목표를 정한 이후로는 오히려 속도도 빨라지고 서로 의지하며 시너지를 내는 관계가 될 수 있었던 것 같습니다. 완전히 동등한 관계를 유지하며 동일한 목표와 의지를 가지고 프로젝트를 함께 수행할 수 있는 이런 얼마 안 되는 기회를 가지게 되어 즐거웠습니다.

</details>

<details>
  <summary>최재혁 Contact: jaehyeok92007@gmail.com</summary>

제 부족한 점을 더 확실하게 알게 되었던 시간이었습니다.

팀원 들로부터 기술적인 부분, 에러를 대처하는 방법 등 정말 많은 것을 배웠지만 가장 크게 느꼈던 점은 업무에 대한 꼼꼼함과 태도였습니다. 어떤 코드를 작성할 때 이후에 작성하게 될 코드까지 생각하며 작업하는 팀원의 모습을 처음 봤을 때는 의아함을 느꼈습니다. 하지만 작업이 진행될수록 해당 코드들이 확장성을 갖춰서 오히려 작업시간이 줄었고 통일성 또한 가지게 되는 모습을 직접 경험했습니다.

어떤 사소한 부분이라도 결코 지나치지 않고 기록하고 본인의 업무뿐만 아니라 다른 팀원의 업무 현황도 지속적으로 체크하고 도움을 주려는 팀원들의 모습에서 따뜻함을 느낀 동시에 제 업무에만 빠져있던 저 자신에게 부끄러움을 느꼈습니다.

이번 팀 프로젝트에서 가장 큰 수확은 저에게 부족한 그들의 장점이 얼마나 유용하고 중요한지에 대해서 직접 피부로 느낄 수 있던 점이라고 생각합니다. 앞으로 어떤 일을 하더라도 두 분의 모습을 잊지 않고 닮으려고 노력하여 더 나은 사람이 되도록 해야겠다는 생각을 가지게 된 좋은 시간이었습니다.

</details>

<details>
  <summary>임현정 Contact: glowhyun1@gmail.com</summary>

팀프로젝트에서 제일 중요한 건 커뮤니케이션이라는 걸 배우게 되는 시간이었습니다. 코드를 작성해도 이 코드를 이어받아 다른 팀원이 작성할 수도 있기에 빠른 시간 안에 이해할 수 있는 코드를 작성해야 하고 그 코드를 설명할 줄 알아야 했습니다. 그 과정에서 저에게 부족한 부분이 무엇인지, 어떤 부분을 채워야 하는지 깨닫게 되었습니다.
혼자서 코드를 작성할 때는 혼자만 이해하고 넘어갔던 부분을 이제는 "왜?" 라는 생각을 늘 하게 되었습니다.

첫 팀프로젝트에 임하기 전의 마음가짐과 지금의 마음가짐을 비교해봤을 때 한층 더 성장한 것 같습니다. 시작하기 전엔 혼자서 많은 부분을 내가 해내야 한다는 생각이 많았지만, 끝난 지금으로서는 혼자 해내야 하는 게 아닌 팀원 모두가 함께 헤쳐나간다는 생각으로 바뀌게 되었습니다. 그만큼 저희 팀원에게 배운 점도 많고 팀워크라는 것이 무엇인지 배우게 되는 값진 시간이었습니다.

</details>

<br />
