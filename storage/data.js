// 이 파일은 배열 데이터를 관리하기 위한 파일이다.
// 모듈 기술을 도입하여 외부에서 배열에 대해 접근을 막아 버리겠다.
// 모듈 기술을 도입해서 배열에 대한 모든 접근을 data2.js 가 할 것이다
// 외부에서는 직접  menus배열에 검색, 수정, 삭제를 못하고
// 오직 data2.js 파일에서만 가능하도록 모듈화 시킬 것이다. 

//모듈화는 데이터 관리 코드를 별도의 파일로 분리한다.
// 010.html 파일은 화면을 조작하는 코드만있다.
// data2.js를 010.html 파일에서 필요한 데이터만 조작해 주는 코드로 분리한다.

let menus = [];  // 이 배열은 메뉴를 저장하는 기억공간.. 오늘은 이 메뉴의 내용을 서버로 가져오겠다

function fetchMenus() {
    menus = [
        {
            "name": "김밥",
            "description": "밥과 다양한 재료를 김으로 말아 만든 음식",
            "calories": 480
        },
        {
            "name": "떡볶이",
            "description": "매콤달콤한 양념에 떡과 어묵을 넣고 졸인 요리",
            "calories": 380
        },
        {
            "name": "돈가스",
            "description": "돼지고기에 빵가루를 입혀 바삭하게 튀겨낸 요리",
            "calories": 850
        },
        {
            "name": "제육볶음",
            "description": "돼지고기를 매콤한 양념에 볶아낸 요리",
            "calories": 580
        },
        {
            "name": "김치찌개",
            "description": "잘 익은 김치와 돼지고기를 넣고 끓인 얼큰한 찌개",
            "calories": 420
        },
        {
            "name": "된장찌개",
            "description": "구수한 된장 국물에 두부와 채소를 넣고 끓인 찌개",
            "calories": 320
        },
        {
            "name": "비빔밥",
            "description": "나물과 고기, 고추장을 밥과 함께 비벼 먹는 음식",
            "calories": 560
        },
        {
            "name": "순대국밥",
            "description": "진한 돼지 사골 국물에 순대와 부속 고기를 넣은 국밥",
            "calories": 670
        },
        {
            "name": "삼계탕",
            "description": "영계에 인삼과 찹쌀을 넣고 폭 고아낸 보양식",
            "calories": 920
        },
        {
            "name": "카레라이스",
            "description": "채소와 고기를 넣고 끓인 카레를 밥에 얹어 먹는 요리",
            "calories": 620
        },
        {
            "name": "잔치국수",
            "description": "깔끔한 멸치 육수에 소면을 말아 먹는 국수",
            "calories": 400
        },
        {
            "name": "냉면",
            "description": "시원한 동치미 육수나 매콤한 양념에 비벼 먹는 메밀국수",
            "calories": 520
        },
        {
            "name": "갈비탕",
            "description": "소갈비를 푹 고아 만든 진하고 시원한 국물 요리",
            "calories": 630
        },
        {
            "name": "햄버거",
            "description": "빵 사이에 패티와 채소를 넣어 만든 패스트푸드",
            "calories": 550
        },
        {
            "name": "피자",
            "description": "도우 위에 치즈와 다양한 토핑을 올려 구워낸 요리",
            "calories": 800
        },
        {
            "name": "초밥",
            "description": "초절임한 밥 위에 신선한 생선이나 해산물을 얹은 요리",
            "calories": 500
        },
        {
            "name": "닭갈비",
            "description": "닭고기와 채소를 매콤한 양념에 철판으로 볶은 요리",
            "calories": 680
        },
        {
            "name": "부대찌개",
            "description": "햄, 소세지, 라면 사리 등을 넣고 얼큰하게 끓인 찌개",
            "calories": 730
        },
        {
            "name": "마라탕",
            "description": "얼얼하고 매운 국물에 원하는 재료를 넣고 끓인 중국식 탕 요리",
            "calories": 850
        },
        {
            "name": "샌드위치",
            "description": "식빵 사이에 햄, 치즈, 채소 등을 넣어 만든 간편식",
            "calories": 350
        }
    ]
}
// 이번에는 서버에서 데이터를 요청해야 한다. 방식 : 클라이언트의 요청과 서버의 응답이 이루어 져야 한다.
// API  사용해서 개발합니다
// API : 서로 다른 프로그램이 데이터를 주고 받거나, 기능을 요청하도록 연결한 통로
// 오늘은 내가 만든 프로그램과  서버에서 제공하는 데이터를 받기 위한 목적으로 공부
// http://192.168.0.5:8080/getFood 서버의 프로그램에서 데이터를 받아 오겠다.
//async function fetchMenus() {
//예외: 프로그램이 동작이 됩니다.. 동작 되는 동안에 발생하는 이슈..
//아래 코드에서 예상되는 예외.. 서버가 없을 경우.. 이런 이슈..
//서버가 데이터를 잘 못 줘서..  response.json(); 이 코드 에러날 이슈..
// 이런 예외가 발생했다고 다른 서비스까지 영향을 주면 안된다.. 그래서 나온 코드가  try catch
//try{} -예외를 감지하는 블록 이 블록안에서 예외가 발생할 수 있다.
//catch()  { } 블록은 예외가 발생시 처리해 주는 코드..
//catch() {  console.err } > 이 코드의 의미는 예외가 발생하면 콘솔에 찍어라. 어떤 예외인지
//분석하기 위한 코드입니다.
//try 구문에서 예외가 발생하면 더 이상 코드를 실행하지 않고  catch 문으로 이동한다.
// 이렇게 해서 예외가 발생하면 안정적으로 프로그램을 동작시킨다.
// 마라톤대회에서 선수가  트랙을 돌다가  건강에 예외를 느끼면 바로 구급차(catch)로 이동해서
// 대회에 지장이 없게 한다.. 구급차 이동한 사람은 더이상 트랙을 달릴 수 없다. 
//try {
// 서버에 요청하는 코드 : fetch('http://192.168.0.5:8080/getFood'
// await : 자바스크립트는 요청하고 응답을 기다리지 않고 바로 다음 코드를 실행
// 그런데 응답이 온 후 다음 작업을 해야 할 경우.. 응답을 기다리도록 합니다.
// await를 쓰려면 함수 앞아 async 라는 키워드가 있어야..  자바스크립트가  await를 해 줍니다.
// 즉 서버에 요청하고 응답이 올 때 까지 기다려.. 라는 코드입니다
// 만약 응답을 기다리지 않는다면 응답이 없는 상태에서 다음 작업을 한다..  의미가 없다.
// 서버가 뭘 줘야 .. 다음의 일을 진행할 수 있잖아요.
// 레벌업 : 그런데.. 서버에게 요청하고 확인 안하는 경우도 있다. 어떤서비스: 좋아요
// await는 필수적으로 서버의 응답이 필요 할 때.
// const response = await fetch('http://192.168.0.5:8080/getFood');
// if (!response.ok) {
//     throw new Error('네트워크 응답이 올바르지 않습니다.');
// }
// console.log(response.json());
// response.json(); response가 응답 객체.. 이 객체를 json으로 바꿔라..
// 다 바꿔야지 menus에 저장을 하겠죠. 그래서 response.json();을 할동안  await
menus = await response.json();
console.log('메뉴 데이터 로드 완료:', menus);
//     } catch (error) {
//         console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
//     }
// }

//전역구간에 있으니 이 파일이 로딩되면 바로 호출되는 메서드..
//await fetchMenus(); //메서드 콜.. await 기다리다.. 콜하고 기다려.. 
fetchMenus();
// 변수로 접근하지 못하게 module 타입으로 가져가도록 했어요
// 이변수에 대한 조회, 수정, 삭제등의 권한도  data2.js  가 가지고 있어요
// 그래서 이 서비스에 대한 함수를 만들어 줘야 하니다.

//export는 이 함수를 외부에서 사용할 수 있도록 하겠다.. 외부용..
export function getMenus() {
    return [...menus];
}

//메뉴를 검색하는 기능을 data2.js가 가지고 있고. 외부에서 필요하면 콜해서 써.. word
//매개변수
export function searchMenu(word) {
    return menus.filter(menu => menu.name.includes(word));
}

//메뉴추가
export function addMenuOne(menu) {
    menus.push(menu);
}

//메뉴 삭제
export function deleteOne(idx) {
    idx = idx - 1;
    if (idx >= 0) {
        return menus.splice(idx, 1)  //splice는 menus배열에서 삭제해서 변경.
        //삭제된 객체를 배열로 반환해서 리턴한다..
    } else {
        alert('번호를 잘못 선택했어요')
        return;
    }
}

//칼로리보다 작은 객체 검색
export function caloresSearch(calorie) {
    //filter의 결과는 기존배열에서 얕은 복사로 새로운 배열을 만들어서 리턴
    return menus.filter(menu => menu.calories <= calorie);
}