import EndpointClient from './endpointClient';
import {Theme} from '../model/theme';

export default class ThemeClient extends EndpointClient {
    constructor() {
        super("/api/theme");
    }

    public getUnvotedTheme(): Promise<Theme> {
        return Promise.resolve({
            theme: "Test theme do not vote"
        })
    }

    public suggestTheme (theme: string): Promise<void> {
        return this.post({theme})
    }
}
