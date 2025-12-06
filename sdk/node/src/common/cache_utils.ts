
export class CacheUtils {
    private static cache: { [key: string]: any } = {};

    static setCache(key: string, value: any): void {
        this.cache[key] = value;
        console.log(`Set cache for key: ${key}`);
    }

    static getCache(key: string): any | null {
        return this.cache[key] || null;
    }

    static loadCache(): { api_key: string | null, access_token: string | null } {
        return {
            api_key: this.getCache('api_key'),
            access_token: this.getCache('access_token')
        };
    }

    static saveCache(apiKey: string, accessToken: string): void {
        this.setCache('api_key', apiKey);
        this.setCache('access_token', accessToken);
        console.log('Saved API key and access token to cache.');
    }

    static clearCache(): void {
        this.cache = {};
        console.log('In-memory cache cleared.');
    }
}

export default CacheUtils;