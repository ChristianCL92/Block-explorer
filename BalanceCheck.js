export default class BalanceChecker {
  constructor(web3Current) {
    this.web3 = web3Current;
  }

  async getAccountBalance(account) {
    try {
      const weiBalance = await this.web3.eth.getBalance(account); // Hämtar balansen i Wei
      const etherBalance = this.web3.utils.fromWei(weiBalance, 'ether'); // Konverteras till Ether
      return etherBalance; 
    } catch (error) {
      throw new Error('Error fetching balance:', error);
      
    }
  }
}
