const jwt = require('jsonwebtoken');

module.exports.authenticateToken = (handler) => {
  return async (event, context) => {
    try {
      const authHeader = event.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Invalid Access Token');
      }
      
      const jwtToken = authHeader.split(' ')[1];
      const decodedToken = jwt.verify(jwtToken, 'MY_SECRET_TOKEN');
      
      if (!decodedToken) {
        throw new Error('Invalid Access Token');
      }
      
      // Add the decoded token to the event object for further processing
      event.tokenPayload = decodedToken;
      
      // Call the actual handler with modified event object
      return await handler(event, context);
    } catch (error) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' })
      };
    }
  };
};
