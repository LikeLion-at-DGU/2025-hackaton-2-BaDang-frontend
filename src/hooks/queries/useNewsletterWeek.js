// 파람스로 들어온 데이터가 20xx-xx-xx 형식임.
// 이를 이용해 몇 월 몇주차인지 파싱해서 반환하는 로직.

function useNewsletterWeek(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    // 해당 월 1일
    const firstDayOfMonth = new Date(year, month - 1, 1);

    // 월요일=0, 일요일=6로 변환
    const getMondayBasedDay = d => (d.getDay() + 6) % 7;

    const firstDayWeek = getMondayBasedDay(firstDayOfMonth);
    
    // 월 1일을 기준으로 첫 주는 1주차
    const diffDays = (date - firstDayOfMonth) / (1000 * 60 * 60 * 24);
    const week = Math.ceil((diffDays + firstDayWeek + 1) / 7);

    return { year, month, week };
}

export default useNewsletterWeek;