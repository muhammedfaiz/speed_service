export const extractChatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    return `${padZero(hours)}:${minutes} ${ampm}`;
}

function padZero(number) {
    return number.toString().padStart(2, '0');
}
