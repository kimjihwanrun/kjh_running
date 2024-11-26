// 마라톤 기록 데이터
const marathons = [
    { user: "kimjihwan", name: "서울 마라톤", year: "2024", category: "full", time: "4:35:12", distance: "42.195km", logo: "assets/logos/seoul-logo.png" },
    { user: "kimjihwan", name: "부산 마라톤", year: "2023", category: "half", time: "2:10:45", distance: "21.1km", logo: "assets/logos/busan-logo.png" },
    { user: "kimjihwan", name: "제주 마라톤", year: "2024", category: "10k", time: "00:55:32", distance: "10km", logo: "assets/logos/jeju-logo.png" },
    { user: "kimsangjin", name: "서울 마라톤", year: "2024", category: "full", time: "5:00:00", distance: "42.195km", logo: "assets/logos/seoul-logo.png" },
    { user: "kimsangjin", name: "대구 마라톤", year: "2023", category: "half", time: "2:20:00", distance: "21.1km", logo: "assets/logos/daegu-logo.png" },
    // ... 다른 데이터 추가
];

// URL에서 user 파라미터 가져오기
const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');

// 첫 로드 시 사용자 데이터 필터링
window.onload = updateResults;

// 결과 업데이트
function updateResults() {
    const year = document.getElementById('year').value;
    const category = document.getElementById('category').value;

    // 사용자 필터 추가
    const filtered = marathons.filter(m =>
        m.user === user &&
        (year === '전체' || m.year === year) &&
        (category === '전체' || m.category === category)
    );

    // 결과 출력
    const list = document.getElementById('marathon-list');
    list.innerHTML = ""; // 기존 리스트 초기화

    filtered.forEach(marathon => {
        const item = document.createElement('li');
        const img = document.createElement('img');
        img.src = marathon.logo;
        img.alt = marathon.name;

        const text = document.createElement('span');
        text.textContent = marathon.name;

        item.appendChild(img);
        item.appendChild(text);
        item.onclick = () => renderMarathonPage(marathon);

        list.appendChild(item);
    });

    console.log(filtered); // 필터링된 데이터 확인
}

// 기록 페이지로 이동
function renderMarathonPage(marathon) {
    window.location.href = `record.html?name=${encodeURIComponent(marathon.name)}&time=${encodeURIComponent(marathon.time)}&distance=${encodeURIComponent(marathon.distance)}&category=${encodeURIComponent(marathon.category)}`;
}

function goBack2() {
    window.location.href = 'index.html';
}