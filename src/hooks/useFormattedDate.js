import { useMemo } from "react";

const days = ['일', '월', '화', '수', '목', '금', '토'];

const useFormmatedDate = (inputDate) => {
    const formatted = useMemo (() => {
        const date = new Date(inputDate);
        
        const year = date.getFullYear();
        const month = (date.getMonth()+1).toString().padStart(2,'0')
        const day = date.getDate().toString().padStart(2,'0')

        const weekday = days[date.getDay()];

        return `${year}.${month}.${day} (${weekday})`;
    },[inputDate])

    return formatted
}

export default useFormmatedDate;