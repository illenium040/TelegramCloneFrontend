

export const getDateString = (dbDate?: Date) => {
    if (!dbDate) return "";
    var date = new Date(dbDate);
    return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
}

export const scrollBottom = (selector: string) => {
    const scrollable = document.querySelector('.chat-body');
    scrollable?.scrollTo(0, scrollable.scrollHeight);
}

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}