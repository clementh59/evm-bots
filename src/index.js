import { ethers } from "ethers";
import { sendTx, interactWithContract } from "./send.js";

export const tx1 = async () => {
    // just send ETH
    await sendTx({ 
        value: ethers.utils.parseUnits("0.000001"),
        to: "0xE497182dEaDb8Fe21B69BB81F6fb9889ad1a8DaE"
    });
}

const main = async () => {
    //await tx1();
    await interactWithContract();
    console.log("Done");
}

main();