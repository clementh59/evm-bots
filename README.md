# evm-bots

## Documentation

You'll find [here](ethereumBookNotes.md) my notes on the [ethereum book](https://github.com/ethereumbook/ethereumbook).

## Installation

1. `npm i`
2. Create a `.env` file that contains a `PRIVATE_KEY` field.

## Simulate a tx

In order to test a tx, using `callStatic` instead of call will simulate the tx. You'll find more info in the [documentation](https://docs.ethers.io/v5/api/contract/contract/#contract-callStatic).

Here is an example of implementation:
```js
// before
await contractWETH.transfer(to, "1");
// to simulate
await contractWETH.callStatic.transfer(to, "1");
```