import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";
import asideReducer from "./asideReducer";

export let store = {
    _callSubscriber() {
        console.log('no subscribers (observers)');
    },
    _state: {
        profilePage: {
            postData: [
                {
                    id: '3',
                    date: '10/20/2019',
                    likeCount: '15',
                    postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n' +
                        'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\n' +
                        'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\n' +
                        'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\n' +
                        'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
                },
                {
                    id: '2',
                    date: '10/20/2019',
                    likeCount: '54',
                    postText: 'I learn React JS'
                },
                {
                    id: '1',
                    date: '10/20/2019',
                    likeCount: '24',
                    postText: "It'style my first post"

                }
            ],
            postTextValue: ''
        },
        dialogsPage: {
            messagesData: [
                {
                    id: '1',
                    date: '3 days ago',
                    message: 'Hi, how are you doing? Long time no see. Where have you been?',
                    avatar: 'https://img.novosti-n.org/upload/ukraine/131388.jpg',
                    user: 'Linda Lohan'
                },
                {
                    id: '2',
                    date: '3 days ago',
                    message: '\n' +
                        'I was on vacation',
                    avatar: 'https://klv-oboi.ru/img/gallery/29/thumbs/thumb_l_15614.jpg',
                    user: 'Edouard Shvetsov'
                },
                {
                    id: '3',
                    date: '3 days ago',
                    message: "that'style cool I wish I were you ",
                    avatar: 'https://img.novosti-n.org/upload/ukraine/131388.jpg',
                    user: 'Linda Lohan'
                },
                {
                    id: '4',
                    date: '3 days ago',
                    message: 'By',
                    avatar: 'https://klv-oboi.ru/img/gallery/29/thumbs/thumb_l_15614.jpg',
                    user: 'Edouard Shvetsov'
                },
                {
                    id: '5',
                    date: 'a min ago',
                    message: "Hi, how are you",
                    avatar: 'https://img.novosti-n.org/upload/ukraine/131388.jpg',
                    user: 'Linda Lohan'
                }
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
            ],
            messageTextValue: ''
        },
        asidePage: {
            friendsData: [
                {
                    id: '1',
                    avatar: 'https://img.novosti-n.org/upload/ukraine/131388.jpg'
                },
                {
                    id: '2',
                    avatar: 'https://klike.net/uploads/posts/2018-06/1530091945_3.jpg'
                },
                {
                    id: '3',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjWXoKLKMt8-IR9504EuSi9WcxZv-2pJbwyNCPN61BSr8SqyfSuQ'
                },
                {
                    id: '4',
                    avatar: 'http://v.img.com.ua/b/600x500/1/49/e992794f04c0a966466c7ac4c8a89491.jpg'
                },
                {
                    id: '5',
                    avatar: 'https://img2.goodfon.ru/wallpaper/big/b/7d/devushka-model-shatenka-5564.jpg'
                }, {
                    id: '6',
                    avatar: 'http://skorpionchik.ru/wp-content/uploads/2016/02/bill-gates.jpg'
                }
            ]
        }
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
        this._state.asidePage = asideReducer(this._state.asidePage, action);

        this._callSubscriber(this);
    }
};






