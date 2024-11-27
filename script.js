// 마라톤 기록 데이터
const marathons = [
    { user: "kimjihwan", name: "2024 서울 마라톤", year: "2024", category: "full", time: "4:35:12", distance: "42.195km", logo: "assets/logos/seoul-logo.png" },
    { user: "kimjihwan", name: "2024 jtbc 마라톤", year: "2023", category: "half", time: "2:10:45", distance: "21.1km", logo: "assets/logos/jtbc-logo.png" },
    { user: "kimjihwan", name: "2023 대구 마라톤", year: "2024", category: "10k", time: "00:55:32", distance: "10km", logo: "assets/logos/daegu-logo.png" },
    { user: "kimsangjin", name: "서울 마라톤", year: "2024", category: "full", time: "5:00:00", distance: "42.195km", logo: "assets/logos/seoul-logo.png" },
    { user: "kimsangjin", name: "대구 마라톤", year: "2023", category: "half", time: "2:20:00", distance: "21.1km", logo: "assets/logos/daegu-logo.png" },
];

// URL에서 user 파라미터 가져오기
const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get("user");

// 사용자별 동영상 데이터
const userVideos = {
    kimjihwan: "assets/videos/kimjihwan.mp4",
    kimsangjin: "assets/videos/kimsangjin.mp4",
};

// 페이지 로드 시 초기화
window.onload = function () {
    // 동영상 재생
    if (user) {
        showOverlay();
    }

    // 기본 마라톤 데이터 표시
    updateResults();
};
// 동영상 오버레이 표시
function showOverlay() {
    // 페이지 처음 로드일 경우에만 동영상 표시
    if (!sessionStorage.getItem("videoPlayed")) {
        const overlay = document.getElementById("overlay");
        const userVideo = document.getElementById("user-video");

        // 사용자 동영상 설정
        userVideo.src = userVideos[user] || "assets/videos/default.mp4";

        // 오버레이 표시
        overlay.classList.add("show");
        overlay.classList.remove("hidden");

        // 배경 흐림 효과 적용
        document.body.classList.add("overlay-active");

        // 동영상 끝났을 때 페이드아웃 시작
        userVideo.onended = () => {
            overlay.classList.remove("show");
            setTimeout(() => {
                overlay.classList.add("hidden");

                // 배경 흐림 효과 제거
                document.body.classList.remove("overlay-active");

                // sessionStorage에 영상이 표시되었음을 기록
                sessionStorage.setItem("videoPlayed", "true");

                updateResults(); // 동영상 끝난 후 모든 리스트를 로드
            }, 3000); // 페이드아웃 시간 (3초와 일치)
        };

        // 동영상 재생 시작
        userVideo.play();
    } else {
        // sessionStorage에 'videoPlayed'가 설정되면, 바로 리스트를 로드
        updateResults();
    }
}

// 결과 업데이트
function updateResults() {
    const year = document.getElementById("year").value || "전체";
    const category = document.getElementById("category").value || "전체";

    const filtered = marathons.filter(m =>
        m.user === user &&
        (year === "전체" || m.year === year) &&
        (category === "전체" || m.category === category)
    );

    const list = document.getElementById("marathon-list");
    list.innerHTML = ""; // 기존 리스트 초기화

    filtered.forEach(marathon => {
        const item = document.createElement("li");
        const img = document.createElement("img");
        img.src = marathon.logo;
        img.alt = marathon.name;

        const text = document.createElement("span");
        text.textContent = marathon.name;

        item.appendChild(img);
        item.appendChild(text);
        item.onclick = () => renderMarathonPage(marathon); // 클릭 시 해당 페이지로 이동

        list.appendChild(item);
    });

    // 기본 데이터 표시
    if (filtered.length === 0) {
        const noData = document.createElement("li");
        noData.textContent = "등록된 데이터가 없습니다.";
        list.appendChild(noData);
    }
}

// 마라톤 기록 페이지로 이동
function renderMarathonPage(marathon) {
    // 기록 페이지로 이동하면서 필요한 정보를 URL 파라미터로 전달
    window.location.href = `record.html?name=${encodeURIComponent(marathon.name)}&time=${encodeURIComponent(marathon.time)}&distance=${encodeURIComponent(marathon.distance)}&category=${encodeURIComponent(marathon.category)}`;
}

// 뒤로가기
function goBack2() {
    window.location.href = "index.html";
}
