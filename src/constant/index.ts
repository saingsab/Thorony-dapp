import NFTABI from '../abis/nftABI.json';
import STAKINGABI from '../abis/STAKING.json';
import ERC20ABI from '../abis/ERC20.json';

const ABI = {
  NFTABI,
  STAKINGABI,
  ERC20ABI,
}

const ADDRESS = {
  ERC20: '0x23A1F6d541bB21399D7a8A308175F021BAC3df07',
  NFTADDRESS: '0x8bc739d8Def54afD87FbFc872cEF60139320446e',
  STAKING: '0x95C65020288587213E627a509B419f7ed945902F'
}

export { ABI, ADDRESS };