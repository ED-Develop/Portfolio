const ADD_MESSAGE = 'portfolio/dialogs/ADD-MESSAGE';
const UPDATE_MESSAGE_TEXT_VALUE = 'portfolio/dialogs/UPDATE-MESSAGE-TEXT-VALUE';

let initialState = {
    messagesData: [
        {
            id: 1,
            userId: 22,
            date: '3 days ago',
            message: 'Hi, how are you doing? Long time no see. Where have you been?',
            avatar: 'https://img.novosti-n.org/upload/ukraine/131388.jpg',
            user: 'Linda Lohan'
        },
    ],
    dialogsData: [
        {
            id: '1',
            name: 'Linda Lohan',
            date: 'a min ago',
            avatar: 'https://img.novosti-n.org/upload/ukraine/131388.jpg',
            lastMessage: 'Hi, how are you'
        },
        {
            id: '2',
            name: 'Julia Cox',
            date: 'an hour ago',
            avatar: 'https://klike.net/uploads/posts/2018-06/1530091945_3.jpg',
            lastMessage: 'see you soon'
        },
        {
            id: '3',
            name: 'Sophia Lee',
            date: '13 hour ago',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjWXoKLKMt8-IR9504EuSi9WcxZv-2pJbwyNCPN61BSr8SqyfSuQ',
            lastMessage: 'Okey fine, thank you'
        },
        {
            id: '4',
            name: 'John Doe',
            date: 'Yesterday',
            avatar: 'http://v.img.com.ua/b/600x500/1/49/e992794f04c0a966466c7ac4c8a89491.jpg',
            lastMessage: 'Yey anybody there'
        },
        {
            id: '5',
            name: 'Anna Young',
            date: '2 days ago',
            avatar: 'https://img2.goodfon.ru/wallpaper/big/b/7d/devushka-model-shatenka-5564.jpg',
            lastMessage: 'I gotta go'
        },
        {
            id: '6',
            name: 'Richard Beell',
            date: '2 days ago',
            avatar: 'http://skorpionchik.ru/wp-content/uploads/2016/02/bill-gates.jpg',
            lastMessage: 'Hey there?'
        }
    ]
};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: ` ${+state.messagesData[state.messagesData.length - 1].id + 1}`,
                userId: action.userId,
                date: 'a min ago',
                message: action.messageText,
                avatar: null,
                user: action.login
            };
            debugger
            return {
                ...state,
                messagesData: [... state.messagesData, newMessage],
                messageTextValue: ''
            };
        case UPDATE_MESSAGE_TEXT_VALUE:
            return {
                ...state,
                messageTextValue: action.newText
            };
        default:
            return state;
    }
};

export const addMessage = (messageText, userId, login) => ({type: ADD_MESSAGE, messageText, userId, login});

export default dialogReducer;