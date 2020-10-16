import {useParams} from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react';

type ParamsType = {
    userId?: string
}

export const useProfileId = (ownerId: number | null) => {
    const {userId: paramId} = useParams<ParamsType>();
    const [isMyProfile, setIsMyProfile] = useState(false);

    const userId = useMemo(() => paramId && !isNaN(+paramId) ? +paramId : ownerId, [paramId, ownerId]);

    useEffect(() => {
        setIsMyProfile(userId === ownerId);
    }, [userId, ownerId]);

    return {userId, isMyProfile};
}