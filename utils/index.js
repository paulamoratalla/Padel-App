module.exports = {
  
  // userIs: user => user.role === 'USER',
  userIsMod: user => user.role === 'MOD',
  userIsAdmin: user => user.role === 'ADMIN',
  userIsOwn: (user, currentID) => user === currentID,

}