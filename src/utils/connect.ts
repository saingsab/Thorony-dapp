import { ethers } from "ethers";

interface IProps {
  address: string;
  abi: object[];
}

export default function connectContract({ address, abi }: IProps) {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum as object);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  return contract;
}
