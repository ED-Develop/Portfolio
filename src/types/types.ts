import {UploadStatus} from "../redux/timeline/timeline-reducer";

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType
    followed: boolean
}

export type PhotosType = {
    small: string | null,
    large: string | null
}


export type ProfileType = {
    userId: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
};

export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}

export type PostType = {
    postId: string,
    date: string | number,
    user: PostUserType
    content: TPostContent
    statistic: TPostStatistic
    comments: Array<TPostComments>
}

export type PostUserType = {
    fullName: string | null
    id: number | null
    photos: PhotosType
}

export type TPostContent = {
    text?: string
    photos: Array<any>
    video?: string
}

export type TPostStatistic = {
    liked: Array<number>
    comments: number
    shared: number
    saved: number
}

export type TPostComments = {
    id: number
    user: PostUserType
    content: string
    date: string
}

export type TPostFormData = {
    text: string
    photos: Array<File>
}

export type ProjectType = {
    name: string,
    type: string,
    technologies: string,
    logo: string,
    link: string
}

export type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type TUploadedFile = {
    status: UploadStatus
    fileName: string
    fileUrl: string
}
