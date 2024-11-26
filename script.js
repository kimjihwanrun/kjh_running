// 마라톤 기록 데이터
const marathons = [
    { name: "서울 마라톤", year: "2024", category: "full", time: "4:35:12", distance: "42.195km", logo: "assets/logos/seoul-logo.png" },
    { name: "부산 마라톤", year: "2023", category: "half", time: "2:10:45", distance: "21.1km", logo: "assets/logos/busan-logo.png" },
    { name: "제주 마라톤", year: "2024", category: "10k", time: "00:55:32", distance: "10km", logo: "assets/logos/jeju-logo.png" }
];

// 결과 업데이트
function updateResults() {
    const year = document.getElementById('year').value;
    const category = document.getElementById('category').value;

    const filtered = marathons.filter(m => m.year === year && m.category === category);
    const list = document.getElementById('marathon-list');
    list.innerHTML = "";

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
}

// 기록 페이지로 이동
function renderMarathonPage(marathon) {
    window.location.href = `record.html?name=${marathon.name}&time=${marathon.time}&distance=${marathon.distance}&logo=${marathon.logo}`;
}
