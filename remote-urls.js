const baseurl = 'https://kshitijraj09.github.io';

const sharedlibRemoteLoc = process.env.NODE_ENV === 'production' ?
  `${baseurl}/sharedlib` :
  'http://localhost:5003';

const accountRemoteLoc = process.env.NODE_ENV === 'production' ?
  `${baseurl}/account_mf` :
  'http://localhost:5001';
  
const peopleRemoteLoc = process.env.NODE_ENV === 'production' ?
  `${baseurl}/people_mf` :
  'http://localhost:5002';

const postRemoteLoc = process.env.NODE_ENV === 'production' ?
  `${baseurl}/post_mf` :
  'http://localhost:5005';

const messengerRemoteLoc = process.env.NODE_ENV === 'production' ?
  `${baseurl}/messenger_mf` :
   'http://localhost:5004';
  
module.exports = {
   messengerRemoteLoc,
   postRemoteLoc,
   sharedlibRemoteLoc,
   peopleRemoteLoc,
   accountRemoteLoc
}