import { ethers } from "ethers";
import { sendTx } from "./send.js";

export const tx1 = async () => {
    // just send ETH
    await sendTx({
        value: ethers.utils.parseUnits("0.0001"),

    });
}

export const tx2 = async () => {
    // just send ETH
    await sendTx({ value: ethers.utils.parseUnits("0.001") });
}

const main = async () => {
    tx1();
    console.log("Done");
}

main()