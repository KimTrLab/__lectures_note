import { 
    getMenus, 
    searchMenu, 
    addMenuOne, 
    deleteOne,
    caloresSearch 
} from "../storage/data.js";

let menus = [];       // 전체 메뉴 배열
let currentPage = 1;  // 현재 페이지 번호
const itemsPerPage = 3; // 한 페이지당 보여줄 메뉴 개수

// 데이터 불러오기 함수
function load() {
    menus = getMenus(); // menus 배열 가져오기
} 

// 이벤트 리스너 등록
document.getElementById('searchBtn').addEventListener('click', searchMenus);
document.getElementById('addBtn').addEventListener('click', addMenu);
document.getElementById('choiceMenu').addEventListener('click', choiceMenu);
document.getElementById('deleteBtn').addEventListener('click', deleteMenu);
document.getElementById('calorieBtn').addEventListener('click', searchCalories);
document.getElementById('recommendBtn').addEventListener('click', recommendMenu);

// 페이징 버튼 이벤트 리스너 등록
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    const totalPages = Math.ceil(menus.length / itemsPerPage) || 1;
    if (currentPage < totalPages) {
        currentPage++;
        renderPage();
    }
});

// HTML 요소 가져오기
const menuCount = document.getElementById('menuCount');
const menuList = document.getElementById('menuList');
const pageInfo = document.getElementById('pageInfo');

// 메인 페이지 및 페이징 출력 함수
function renderPage() {
    load();

    // 전체 페이지 수 계산 (최소 1페이지 보장)
    const totalPages = Math.ceil(menus.length / itemsPerPage) || 1;

    // 만약 현재 페이지가 전체 페이지보다 커지면(예: 마지막 항목 삭제 시) 페이지 번호 보정
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    // menuList 초기화
    menuList.innerHTML = "";

    // 현재 페이지에 해당하는 데이터만 자르기 (slice)
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageMenus = menus.slice(startIndex, startIndex + itemsPerPage);

    // 페이지에 해당하는 메뉴 카드 생성 및 출력
    pageMenus.forEach((menu, index) => {
        // 절대적인 전체 번호 계산 (예: 2페이지 첫 번째면 4번부터 시작)
        const absoluteIndex = startIndex + index;

        const card = document.createElement("div");  
        card.className = "menuCard";  

        const title = document.createElement("h4");  
        title.textContent = (absoluteIndex + 1) + ". " + menu.name;

        const calories = document.createElement("p"); 
        calories.textContent = "칼로리: " + menu.calories + " kcal";

        const description = document.createElement("p"); 
        description.textContent = menu.description;

        card.append(title, calories, description); 
        menuList.append(card); 
    });

    // 전체 개수 및 페이징 정보 텍스트 갱신
    menuCount.textContent = "전체 메뉴: " + menus.length + "개";
    pageInfo.textContent = currentPage + " / " + totalPages;
}

// 초기 화면 출력 호출
renderPage();

// 번호로 메뉴 상세 정보 조회하기 기능 함수
function choiceMenu() {
    const number = Number(document.getElementById('inputField').value);
    if (!Number.isInteger(number) || number <= 0) {
        alert('올바른 메뉴 번호를 입력하세요.');
        return;    
    }

    const menu = menus[number - 1];
    const menuDisplay = document.getElementById('displayMenu');

    if (!menu) {
        menuDisplay.textContent = "해당 번호의 메뉴가 존재하지 않습니다.";
        return;
    }

    menuDisplay.textContent = menu.name + " / " + menu.calories + " kcal / " + menu.description;
    document.getElementById('inputField').value = ""; // 입력창 초기화
}

// 메뉴명 검색 기능
function searchMenus() {
    const word = document.getElementById('searchField').value.trim();
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = "";

    if (!word) {
        alert('검색할 메뉴명을 입력하세요.');
        return;
    }

    const result = searchMenu(word);

    if (result.length === 0) {
        searchResult.innerHTML = "<p style='color: #e74c3c; font-size: 14px;'>검색 결과가 없습니다.</p>";
        return;
    }

    result.forEach(menu => {
        const pp = document.createElement("p");
        pp.style.fontSize = "14px";
        pp.style.marginBottom = "6px";
        pp.textContent = "📍 " + menu.name + " / " + menu.calories + " kcal / " + menu.description;
        searchResult.appendChild(pp);
    });

    document.getElementById('searchField').value = ""; // 입력창 초기화
}

// 메뉴 추가 기능
function addMenu() {
    const name1 = document.getElementById('addName').value.trim();
    const calories1 = document.getElementById('addCalories').value.trim();
    const description1 = document.getElementById('addDescription').value.trim();

    if (!name1 || !calories1 || !description1) {
        alert('모든 항목을 입력해 주세요.');
        return;
    }

    const newMenu = {
        name: name1,
        calories: Number(calories1),
        description: description1
    };

    addMenuOne(newMenu);

    // 입력 필드 초기화
    document.getElementById('addName').value = "";
    document.getElementById('addCalories').value = "";
    document.getElementById('addDescription').value = "";

    // 새 메뉴가 추가되었으므로 마지막 페이지로 이동하여 확인 가능하게 처리하거나 첫 페이지 유지
    renderPage();
    alert('새로운 메뉴가 추가되었습니다!');
}

// 메뉴 삭제 기능
function deleteMenu() {
    const number = Number(document.getElementById('deleteField').value);

    if (!Number.isInteger(number) || number <= 0 || number > menus.length) {
        alert('삭제할 올바른 메뉴 번호를 입력하세요.');
        return;
    }
    
    const deleteMenu = deleteOne(number);

    if (deleteMenu && deleteMenu.length > 0) {
        alert(deleteMenu[0].name + " 메뉴를 삭제했어요.");
    }

    document.getElementById('deleteField').value = ""; // 입력창 초기화
    renderPage();
}

// 칼로리 검색 기능
function searchCalories() {
    const calorie = Number(document.getElementById('calorieField').value);
    const resultArea = document.getElementById('calorieResult');  

    resultArea.innerHTML = "";

    if (!Number.isInteger(calorie) || calorie < 0) {
        alert('올바른 최대 칼로리를 입력하세요.');
        return;
    }

    const result = caloresSearch(calorie); 

    if (result.length === 0) {
        resultArea.innerHTML = "<p style='color: #e74c3c; font-size: 14px;'>조건에 맞는 메뉴가 없어요.</p>";
        return;
    }

    result.forEach(menu => {
        const pp = document.createElement("p");
        pp.style.fontSize = "14px";
        pp.style.marginBottom = "6px";
        pp.textContent = "⚡ " + menu.name + " / " + menu.calories + " kcal / " + menu.description;
        resultArea.appendChild(pp);
    });

    document.getElementById('calorieField').value = ""; // 입력창 초기화
}

// 오늘의 추천 메뉴 기능
function recommendMenu() {
    if (menus.length === 0) {
        alert('등록된 메뉴가 없습니다.');
        return;
    }

    const randomIdx = Math.floor(Math.random() * menus.length);
    const menu = menus[randomIdx];

    const recommendResult = document.getElementById('recommendResult');
    recommendResult.innerHTML = "";
    
    const pp = document.createElement("p");
    pp.style.fontSize = "14px";
    pp.style.color = "#d35400";
    pp.style.fontWeight = "bold";
    pp.textContent = "🔥 [오늘의 추천] " + menu.name + " / " + menu.calories + " kcal / " + menu.description;
    
    recommendResult.appendChild(pp);
}