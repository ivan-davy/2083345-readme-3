export enum ApplicationServiceURL {
  Auth = 'http://localhost:3000/api/auth',
  BlogPost = 'http://localhost:3332/api/post',
  BlogComment = 'http://localhost:3332/api/comment'
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
