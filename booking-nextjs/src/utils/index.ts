import moment from 'moment';

export function formatDateTime(timestamp: string): string {
    const date = new Date(timestamp);

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${year}/${month}/${day} ${hour}:${minute}`;
}

export function formatVND(amount: number) {
    let formatted = amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return formatted;
}
export function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp);

    const weekday = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'][date.getDay()];

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${weekday} - ${day}/${month}/${year}`;
}
export const getArrDays = () => {
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    let allDays = [];
    for (let i = 0; i < 7; i++) {
        let object = {
            label: '',
            value: NaN,
        };

        if (i === 0) {
            let DDMM = moment(new Date()).format('DD/MM');
            let today = `Today-${DDMM}`;
            object.label = today;
        } else {
            let labelVi = (object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM'));
            object.label = capitalizeFirstLetter(labelVi);
        }

        object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

        allDays.push(object);
    }
    return allDays;
};
