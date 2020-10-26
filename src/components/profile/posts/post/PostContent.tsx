import React from "react";
import style from './Post.module.css';
import {TPostContent} from "../../../../types/types";

type PropsType = {
    content: TPostContent
}

const PostContent: React.FC<PropsType> = ({content}) => {
    const photos = content.photos;
    let photoElements = [];

    if (content.photos && content.photos.length) {
        for (let i = 0; i < content.photos.length; i++) {
            if (i >= 3) break;

            photoElements.push(
                <div className={style.contentPhotos} key={photos[i] + i}>
                    {photos.length > 3 && i === 2 && <div className={style.overlay}>+ {photos.length - 3} More</div>}
                    <img src={photos[i]} alt="post-content"/>
                </div>
            )
        }
    }

    return (
        <div className={style.post__content}>
            {photoElements.length !== 0 && (
                <div className={`${style.photosContainer} ${photos.length >= 2 && style.photoBorder} 
                ${photos.length >= 3 && style.photoGrid}`}
                >
                    {photoElements}
                </div>
            )}
            {content.video && (
                <iframe
                    title='Video'
                    src={content.video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={style.contentVideo}
                />
            )}
            {content.text && <p className={style.postText}>{content.text}</p>}
        </div>
    )
};

export default PostContent;
