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
    id: number,
    date: string,
    likeCount: number,
    postText: string
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
