import { Button, Grid, LoadingOverlay, Select, Space, Text, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Loading from "@/components/Loading";
import NFTCardNoAction from "@/components/NFTCardNoAction";
import { ABI, ADDRESS } from "@/constant";
import connectContract from "@/utils/connect";
import { ethers, utils } from "ethers";
import useAsync from "@/hooks/useAsync";
import { notifications } from "@mantine/notifications";

const Stake = () => {
  const { address } = useAccount();
  const [nfts, setNfts] = useState<any[]>([]);
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>('');
  const [erc20Info, setERC20Info] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchStake = async () => {
      try {
        setLoading(true);
        const contract = connectContract({
          address: ADDRESS.NFTADDRESS,
          abi: ABI.NFTABI
        });
        if (!contract) return;
        const totalId = await contract.ID();
        let _address = [];
        for(let i = 0; i < (+totalId + 1); i++) {
          const stakingContract = connectContract({
            address: ADDRESS.STAKING,
            abi: ABI.STAKINGABI
          });

          if (!stakingContract) return;
          let reward;
          const address = await stakingContract.tokenOwnerOf(i);
          if (address === ethers.constants.AddressZero) {
            reward = '0';
          } else {
            reward = await stakingContract.calculateTokens(i);
          }
          _address.push({ 
            tokenId: i, 
            address,
            reward: reward.toString(),
            label: i,
            value: i
          })
        }
        setNfts(_address);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchStake();
  }, [address]);

  const NFTS = nfts.filter(item => item.address === address);

  const rewardByTokenId = () => {
    const reward = NFTS.filter(item => item.label === selectedTokenId)[0]?.reward || '0';
    return utils.formatEther(reward);
  }

  const unstake = () => {
    const contract =  connectContract({
      address: ADDRESS.STAKING,
      abi: ABI.STAKINGABI
    })
    if (!contract) return;

    return contract.unstakeNFT(selectedTokenId, '1');
  }

  const { execute: handleUnstake, status } = useAsync(
    unstake,
    async (trx) => {
      notifications.show({
        id: 'load-data',
        loading: true,
        title: 'Transaction in progress',
        message: 'Transaction will be completed in seconds.',
        autoClose: false,
        withCloseButton: false,
        radius: 'md'
      });
      await trx.wait();
      notifications.update({
        id: 'load-data',
        title: 'Transaction completed',
        message: 'Successfully unstaked.',
        radius: 'md'
      })
    },
    (err) => {
      notifications.show({
        title: 'Transaction failed',
        message: err?.reason,
        color: 'red',
        radius: 'md'
      })
      console.log(err?.reason);
    },
    false,
  )

  return (
    <div>
      <LoadingOverlay visible={status === 'pending'} overlayBlur={2} />
      <Title order={3}>Stake</Title>
      <Space h={24} />
      {loading ? (
        <Loading />
      ) : NFTS.length > 0 ? (
        <Grid columns={24}>
          <Grid.Col sm={12} md={8} lg={8} xl={6}>
            <NFTCardNoAction
              title="Indoor Compost NFT"
              description="To create and provide a sustainable ecosystem that supports waste..."
            />
          </Grid.Col>
          <Grid.Col offsetSm={2} sm={10} md={8} lg={8}>
            <Select 
              radius="md" 
              label="Token Id" 
              placeholder="Select Token Id" 
              data={NFTS} 
              value={selectedTokenId}
              onChange={setSelectedTokenId}
            />
            <TextInput label='Amount' placeholder="1" radius='md' disabled />
            <TextInput label='Reward' placeholder={rewardByTokenId() + ' TNT'} radius='md' disabled />
            <Button fullWidth radius="md" mt={16} onClick={handleUnstake}>Unstake</Button>
          </Grid.Col>
        </Grid>
      ): (
        <Text align='center'>No Data...</Text>
      )}
    </div>
  );
}

export default Stake;