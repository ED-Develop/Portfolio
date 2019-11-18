import profileReducer, {addPost, deletePost, incrementedLike} from "./profileReducer";


let state = {
    postData: [
        {
            id: '3',
            date: '10/20/2019',
            likeCount: 15,
            postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n' +
                'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\n' +
                'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\n' +
                'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\n' +
                'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        },
        {
            id: '2',
            date: '10/20/2019',
            likeCount: 54,
            postText: 'I learn React JS'
        },
        {
            id: '1',
            date: '10/20/2019',
            likeCount: 24,
            postText: "It'style my first post"

        }
    ],
};

it('length of post should be incremented', () => {
    let action = addPost('hello');

    let newState = profileReducer(state, action);

    expect(newState.postData.length).toBe(4);
});

it('text of post should be "hello"', () => {
    let action = addPost('hello');

    let newState = profileReducer(state, action);

    expect(newState.postData[0].postText).toBe('hello');
});

it('length of post should be decremented', () => {
    let action = deletePost(1);

    let newState = profileReducer(state, action);

    expect(newState.postData.length).toBe(2);
});

it('like of post should be incremented', () => {
    let action = incrementedLike(3);

    let newState = profileReducer(state, action);

    expect(newState.postData[0].likeCount).toBe(16);
});