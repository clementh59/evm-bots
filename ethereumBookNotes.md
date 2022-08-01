# EthereumBook Notes

This file contains my notes about the [Mastering Ethereum Book](https://github.com/ethereumbook/ethereumbook) written by Andreas M. Antonopoulos and Gavin Wood.

# Transactions

A transaction is a serialized binary message that contains the following data:

Nonce:: A sequence number, issued by the originating EOA, used to prevent message replay. It is equal to the number of confirmed transactions sent from an address. It is not stored in the blockchain and needs to be calculated dynamically. If a transaction with an already used nonce is sent, it will be rejected. If a transaction with a too high nonce is sent, it will be added to the mempool and proceeded once this particular nonce is reached.

Gas price:: The amount of ether (in wei) that the originator is willing to pay for each unit of gas

Gas limit:: The maximum amount of gas the originator is willing to buy for this transaction

Recipient:: The destination Ethereum address

Value:: The amount of ether (in wei) to send to the destination

Data:: The variable-length binary data payload. See the transaction data section to learn more about it.

v,r,s:: The three components of an ECDSA digital signature of the originating EOA

## Transaction data

When your transaction contains data, it is most likely addressed to a contract address. That doesn’t mean you cannot send a data payload to an EOA—that is completely valid in the Ethereum protocol. However, in that case, the interpretation of the data is up to the wallet you use to access the EOA. It is ignored by the Ethereum protocol. 

## Passing data when calling a contract

The data payload sent to an ABI-compatible contract (which you can assume all contracts are) is a hex-serialized encoding of:

A function selector:: The first 4 bytes of the Keccak-256 hash of the function's prototype. This allows the contract to unambiguously identify which function you wish to invoke.

The function arguments:: The function's arguments, encoded according to the rules for the various elementary types defined in the ABI specification.

Let's take a concrete example. Let's imagine you want to interact with this function and withdraw 0.01 ether from a contract:
```solidity
function withdraw(uint withdraw_amount) public {
```

Here, the function prototype is:
```solidity
withdraw(uint256)
```

Let’s calculate the Keccak-256 hash of this string:

```shell
> web3.utils.sha3("withdraw(uint256)");
'0x2e1a7d4d13322e7b96f9a57413e1525c250fb7a9021cf91d1540d5b69f16a49f'
```

The first 4 bytes of the hash are 0x2e1a7d4d. That’s our "function selector" value, which will tell the contract which function we want to call.

Next, let’s calculate a value to pass as the argument withdraw_amount. We want to withdraw 0.01 ether. Let’s encode that to a hex-serialized big-endian unsigned 256-bit integer, denominated in wei:

```shell
> withdraw_amount = web3.utils.toWei(0.01, "ether");
'10000000000000000'
> withdraw_amount_hex = web3.utils.toHex(withdraw_amount);
'0x2386f26fc10000'
```

Now, we add the function selector to the amount (padded to 32 bytes):
```
2e1a7d4d000000000000000000000000000000000000000000000000002386f26fc10000
```

That’s the data payload for our transaction, invoking the withdraw function and requesting 0.01 ether as the withdraw_amount.

## Passing data when deploying a contract

The third use case of the data field is to deploy contracts. Indeed, in order to deploy a contract, you'll need to send a transaction to the 0x0 address with the bytecode as data, here is an example:
```shell
> src = web3.eth.accounts[0];
> contract_code = \
  "0x6060604052341561000f57600080fd5b60e58061001d6000396000f300606...f0029";
> web3.eth.sendTransaction({from: src, to: 0, data: contract_code, \
  gas: 113558, gasPrice: 200000000000});
```

The contract address will be included in the transaction receipt:
```shell
> web3.eth.getTransactionReceipt( \
  "0x7bcc327ae5d369f75b98c0d59037eec41d44dfae75447fd753d9f2db9439124b");

{
  blockHash: "0x6fa7d8bf982490de6246875deb2c21e5f3665b4422089c060138fc3907a95bb2",
  blockNumber: 3105256,
  contractAddress: "0xb226270965b43373e98ffc6e2c7693c17e2cf40b",
  cumulativeGasUsed: 113558,
  from: "0x2a966a87db5913c1b22a59b0d8a11cc51c167a89",
  gasUsed: 113558,
  logs: [],
  logsBloom: \
    "0x00000000000000000000000000000000000000000000000000...00000",
  status: "0x1",
  to: null,
  transactionHash: \
    "0x7bcc327ae5d369f75b98c0d59037eec41d44dfae75447fd753d9f2db9439124b",
  transactionIndex: 0
}
```