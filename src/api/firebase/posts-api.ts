import {FirebaseAPI} from "./firebase";
import {PostType} from "../../types/types";
import StorageAPI from "./storage";

export type TCreatePostResponse = {
    name: string
}

export type TCreatePostPayload = Omit<PostType, 'postId' & { postId?: string }>

type TGetPostResponse = {
    [key: string]: PostType
}

type TChangeLike = {
    liked: Array<number> | []
}

class PostsApi extends FirebaseAPI {
    constructor() {
        super('/posts');
    }

    getPosts() {
        return this.get<TGetPostResponse>().then(posts => {
            return Object.keys(posts)
                .map(key => ({
                    ...posts[key],
                    postId: key,
                    statistic: {...posts[key].statistic, liked: posts[key].statistic.liked || []}
                }))
                .reverse() as Array<PostType>
        })
    }

    changeLike(payload: Array<number>, postId: string) {
        return this.update<{}, TChangeLike>({liked: payload}, `${postId}/statistic`);
    }
}

export const postStorage = new StorageAPI('posts');

export const postApi = new PostsApi();
