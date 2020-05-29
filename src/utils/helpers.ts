export const updateObjectInArray = (items: Array<any>, itemId: number, objPropName: any, newObjProps: any) => {
    return items.map((item) => {
        if (itemId === item[objPropName]) {
            return {...item, ...newObjProps};
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
