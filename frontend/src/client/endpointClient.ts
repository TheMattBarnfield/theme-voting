import axios from 'axios';

export default class EndpointClient {
    protected constructor(private readonly url: string) {}

    protected get() {

    }

    protected async post(body: any): Promise<any> {
        const response = await axios.post(this.url, body);
        if (response.status >= 400) {
            throw new Error(`API responded with ${response.status}: ${response.data}`)
        }
        return response.data;
    }
}
