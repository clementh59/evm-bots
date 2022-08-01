import { ethers } from "ethers";
import { signer, contractWETH } from "./constants.js";
import createLock from "./SimpleLock.js";

// define nonce outside function to persist value
let nonce = 0;
// create lock
const lock = createLock("send");

export const sendTx = async (params) => {
	try {
		// pause execution with lock
		await lock.acquire()

		// get current nonce perceived by blockchain
		const _nonce = await web3.getTransactionCount();
		nonce = nonce > _nonce ? nonce : _nonce;
		console.log(nonce);

		const tx = await signer.sendTransaction({ ...params, nonce });
		console.log(tx);

		// increase nonce
		nonce += 1;
	} catch (error) {
		console.error(error.message)
	} finally {
		// release lock
		lock.release();
	}
}

export const interactWithContract = async () => {
	const to = "0xE497182dEaDb8Fe21B69BB81F6fb9889ad1a8DaE";
	const tx = await contractWETH.transfer(to, "1")
	console.log(tx)
	return;
}