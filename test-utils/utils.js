module.exports = {
    grabUserIdFromTx(userCreationTx) {
      return userCreationTx.receipt.logs[0].args['1'].toString()
    },
  }