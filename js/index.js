//index.html
//개발자
//개발일
//주요기능 1. 랜덤한 추천 여행지 4개 디스플레이

import { getMenus } from "../storage/data.js"

// 메뉴를 랜덤하게 섞은 후 앞에서 4개를 가져와서 화면에 출력하는 코드..
function loadRandomCards() {  
    const menus = getMenus();  //배열에 얕은 복사
    //화면에서 카드를 출력할 돔 객체
    const container = document.getElementById("randomCardContainer");
    //초기화
    container.innerHTML = "";

    if (menus.length === 0) {
        container.innerHTML =
            "<p>데이터를 불러오는 중이거나 메뉴가 없습니다.</p>";
        return;
    }

    // 배열을 복사하여 랜덤하게 섞은 후 앞에서 4개 선택
    // () => 0.5 - Math.random()  랜덤한 기준.. 
    const shuffled = [...menus].sort(() => 0.5 - Math.random());
    // 0번 인덱스 부터 4개를 가져와.. 
    const selectedMenus = shuffled.slice(0, 4);

    selectedMenus.forEach((menu) => {
        const card = document.createElement("div");
        card.className = "menuCard";

        const title = document.createElement("h4");
        title.textContent = menu.name;

        const calories = document.createElement("p");
        calories.className = "calories";
        calories.textContent = "칼로리: " + menu.calories + " kcal";

        const description = document.createElement("p");
        description.textContent = menu.description;

        card.append(title, calories, description);
        container.append(card);
    });
}

loadRandomCards();