export const required = (values) => {
    if (values) {
        return undefined
    }
    return 'This field required!'
};

export const maxLength = (Length) => (values) => {
    if (values && values.length >= Length) {
        return `Max length is ${Length} symbols`;
    }
    return undefined;
};
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined