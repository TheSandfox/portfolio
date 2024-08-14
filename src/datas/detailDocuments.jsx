import { Link } from 'react-router-dom';

export function portfolio({}) {
    return <>
        주요 구현기능:<br/> 
        -키프레임과 스크롤포지션을 활용한 배경전환, 3d애니메이션 제어<br/>
        -THREE.lerp를 활용한 부드러운 카메라 전환<br/>
        <br/>
        손수 모델링, 리깅, 애니메이팅한 캐릭터를 이용해서 꾸며본 간판사이트입니다. 아마추어&NLA애니메이션이 포함된 파일을 gltf로 이식해보는걸 처음해서 시행착오를 많이 겪었습니다. 
    </>
}

export function bandifesta({}) {
    return <>
        주요 구현기능:<br/> 
        -express기반의 REST API별도 제작<br/>
        -서버사이드에서 주기적으로 TourAPI4.0에서 응답받은 데이터 DB에 저장<br/>
        -DB에 저장된 데이터 리스트형식으로 표시 및 무한스크롤 구현<br/>
        -카카오로그인기능 구현, 응답받은 카카오식별아이디를 pk로 사용한 테이블 구현 및 회원정보 저장기능 구현<br/>
        <br/>
        DB활용이나 백엔드 어플 개발 계획은 원래 없었는데 TourAPI4.0 요청 처리 속도가 많이 느리고 원하는 필터링 기능도 제공을 하지 않아서 일단은 쓸 수 있는 모든 데이터를 DB에 쌓아놓고 활용하기로 결정하고 express랑 mysql사용법 복습해서 백엔드 어플도 개발해서 배포하게 되었습니다.(<Link to={'https://github.com/TheSandfox/bandifesta-rest'} target={'_blank'}>https://github.com/TheSandfox/bandifesta-rest</Link>)
    </>
}