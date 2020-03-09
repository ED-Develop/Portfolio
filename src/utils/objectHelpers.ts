export const updateObjectInArray = (items:Array<any>, itemId: number, objPropName: any, newObjProps: any) => {
     return items.map((item) => {
        if (itemId === item[objPropName]) {
            return {...item, ...newObjProps};
        } else {
            return item;
        }
    })
};



