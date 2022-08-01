import { ethers } from "ethers";
import { config } from "dotenv";
import {createRequire} from "module";

const require = createRequire(import.meta.url);
config();

const ROPSTEN = {
    provider: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    WETH_CONTRACT : "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    WETH_ABI: require("./ABIs/erc20Abi.json")
};

const constants = ROPSTEN

const provider = new ethers.providers.JsonRpcProvider(constants.provider);
export const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
export const contractWETH = new ethers.Contract(constants.WETH_CONTRACT, ROPSTEN.WETH_ABI, signer);