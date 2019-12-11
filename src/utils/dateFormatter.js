export const dateFormatter = (date) => {
    let dateStart = new Date(date);
    dateStart.setHours(dateStart.getHours() + 2);
    let dateNow = Date.now();
    let difference = (dateNow - dateStart) / 3600000;

    if (difference <= 0.01) {
        return 'a min ago';
    } else if (difference <= 0.1) {
        return 'a 5 min ago';
    } else if (difference <= 1.3) {
        return 'an hour ago'
    } else if (difference <= 24) {
        return `${Math.ceil(difference)} hour ago`;
    } else if (difference < 48) {
        return 'yesterday';
    } else if (Math.ceil(difference) / 24 < 31) {
        return `${Math.ceil(difference/24)} days ago`;
    } else {
        return 'a long time ago';
    }
};