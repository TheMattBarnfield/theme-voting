import EndpointClient from './endpointClient';

export default class ThemeClient extends EndpointClient {
    constructor() {
        super("/api/theme");
    }

    public suggestTheme (theme: string): Promise<void> {
        return this.post({theme})
    }
}
