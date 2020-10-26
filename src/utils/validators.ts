export type ValidatorsType = (values: string) => string | undefined

export const required = (values: string) => {
    if (values) {
        return undefined
    }
    return 'This field required!'
};

export const maxLength = (Length: number) => (values: string) => {
    if (values && values.length >= Length) {
        return `Max length is ${Length} symbols`;
    }
    return undefined;
};
export const email = (value: string) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;
};

export const link = (value: string) => {
    return value && !/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i.test(value)
        ? 'Invalid link'
        : void 0;
}

