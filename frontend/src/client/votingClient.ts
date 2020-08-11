import {functions} from '../firebase';
import {Theme} from '../model/theme';

const callFunction = (name: string, data?: any): Promise<Theme> => {
    return functions.httpsCallable(name)(data).then(res => res.data)
}

export const getUnvotedTheme = () => callFunction('getTheme');
export const likeTheme = (id: string) => callFunction('likeTheme', {id});
export const dislikeTheme = (id: string) => callFunction('dislikeTheme', {id});
export const skipTheme = (id: string) => callFunction('skipTheme', {id});
