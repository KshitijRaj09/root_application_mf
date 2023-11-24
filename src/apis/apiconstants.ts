
//Login Api constants
export const registerApiUrl = '/userAuth/register';
export const loginApiUrl = '/userAuth/login';

//Post Api constants
export const postApiRoute = '/post'
export const createPostApiUrl = `${postApiRoute}/createPost`;
export const getAllPostsApiUrl = `${postApiRoute}/timeline/all`;

//follow API constants
export const followApiRoute = '/follow';
export const getRecommendedUserApiUrl = `${followApiRoute}/getRecommendedUserList`;
export const followUserAPIUrl = `${followApiRoute}/followuser`;
export const unfollowUserAPIUrl = `${followApiRoute}/unfollowuser`;

//People API constants
export const peopleApiRoute = '/user';
export const getUserDetailsAPIUrl = `${peopleApiRoute}/getUserDetails`;