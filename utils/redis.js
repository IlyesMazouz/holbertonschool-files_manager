import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (error) => {
      console.error('Redis Client Error:', error);
    });

    this.client.connect().catch((error) => {
      console.error('Failed to connect to Redis:', error);
    });
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      console.error('Error getting key from Redis:', error);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, { EX: duration });
    } catch (error) {
      console.error('Error setting key in Redis:', error);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Error deleting key from Redis:', error);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
