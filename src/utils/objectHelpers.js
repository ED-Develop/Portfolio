export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
     return items.map((item) => {
        if (itemId === item[objPropName]) {
            return {...item, ...newObjProps};
        } else {
            return item;
        }
    })
};



