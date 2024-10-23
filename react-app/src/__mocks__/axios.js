export default function axios(url, options) {
    return new Promise((resolve, reject) => {
      // Simulate a successful request
      resolve({ data: {} });
  
      // Simulate an error response
      // reject(new Error('Request failed'));
    });
  }
  
  axios.post = jest.fn().mockResolvedValue({ data: {} });