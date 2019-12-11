import dialogReducer, {addMessage, setDialogs, setMessages} from "./dialogReducer";

const state = {
    dialogs: [],
    messages: []
};

it('array dialogs will not be empty', () => {
    let action = setDialogs([1,2]);

    let newState = dialogReducer(state, action);

    expect(newState.dialogs.length).toBe(2);
});

it('array messages will not be empty', () => {
    let action = setMessages([1,2]);

    let newState = dialogReducer(state, action);

    expect(newState.messages.length).toBe(2);
});

it('length of messages should be incremented', () => {
    let action = addMessage('Hello', 1, 'John');

    let newState = dialogReducer(state, action);

    expect(newState.messages.length).toBe(1);
});