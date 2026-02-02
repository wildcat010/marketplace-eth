export const useAccount = web3 => () => {
    console.log("account")
  return {
    
    account: web3 ? "Test Account" : "null"
  }
}