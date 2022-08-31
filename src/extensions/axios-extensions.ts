import axios from 'axios';

export const serverHost = "https://localhost:7014";

export const tryAxiosRequest = <T>(func: () => T) => {
    try {
        return func();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
        }
        else {
            console.log(error);
        }
    }
    finally {
        return undefined;
    }
}