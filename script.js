document.addEventListener('DOMContentLoaded', () => {
    // 대회별 기록 슬라이드 기능
    const eventSlider = document.querySelector('.event-slider');
    eventSlider.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            eventSlider.scrollLeft += 200; // 오른쪽으로 스크롤
        } else {
            eventSlider.scrollLeft -= 200; // 왼쪽으로 스크롤
        }
    });
});
