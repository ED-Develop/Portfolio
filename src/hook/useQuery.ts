import {useLocation} from 'react-router-dom';
import queryString from 'querystring';
import {TObject} from '../types/types';

export const useQuery = <Q extends TObject>() => {
    const location = useLocation();

    return queryString.parse(location.search.slice(1)) as Q;
}