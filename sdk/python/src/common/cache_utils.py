class CacheUtils:
    _cache = {}  

    @staticmethod
    def set_cache(key, value):
        "Sets a key-value pair in the in-memory cache."
        CacheUtils._cache[key] = value
        print(f"Set cache for key: {key}")

    @staticmethod
    def get_cache(key):
        "Gets the value for a key from the in-memory cache."
        return CacheUtils._cache.get(key, None)

    @staticmethod
    def load_cache():
        "Loads API key and access token from the in-memory cache."
        return {'api_key': CacheUtils.get_cache('api_key'), 'access_token': CacheUtils.get_cache('access_token')}

    @staticmethod
    def save_cache(api_key, access_token):
        "Saves the current API key and access token to the in-memory cache."
        CacheUtils.set_cache('api_key', api_key)
        CacheUtils.set_cache('access_token', access_token)
        print("Saved API key and access token to cache.")

    @staticmethod
    def clear_cache():
        "Clears the in-memory cache."
        CacheUtils._cache.clear()
        print("In - memory cache cleared.")
