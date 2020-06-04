export const updateObjectInArray = <A extends { [key: string]: any }, I, >
(arr: Array<A>, arrItemId: I, arrKeyId: keyof A, objOfProp: Partial<A>) => {
    return arr.map((item) => {
        if (arrItemId === item[arrKeyId]) {
            return {...item, ...objOfProp};
        } else {
            return item;
        }
    })
};

export const parseContent = (string: string) => {
    const linkRegExp = /https:\/\/www.youtube.com\/embed\/(\w+|-|\d+)+\b/i;
    const videoMatch = string.match(linkRegExp);

    return {
        video: videoMatch ? videoMatch[0] : void 0,
        text: string.replace(linkRegExp, '').replace(/\s+/g, ' ')
    }
};

export const findReply = (string: string) => {
    const replyRegExp = /^"@(\w+|\w+\s+\w+)"/i;
    const replyMatch = string.match(replyRegExp);

    return {
        reply: replyMatch ? replyMatch[0].replace(/"/g, '') : void 0,
        content: string.replace(replyRegExp, '')
    }
};

export const findFileName = (string: string) => {
    return string
        .replace(/^https:[^]+%\d\w/i, '')
        .replace(/\?[^]+/, '');
};
