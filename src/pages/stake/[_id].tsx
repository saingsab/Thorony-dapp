import NFTCardNoAction from "@/components/NFTCardNoAction";
import { ABI, ADDRESS } from "@/constant";
import useAsync from "@/hooks/useAsync";
import connectContract from "@/utils/connect";
import { Button, Grid, LoadingOverlay, Space, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount } from "wagmi";

const StakeItem = () => {
  const { query } = useRouter();
  const { address } = useAccount();
  console.log(query._id);

  const mintItem = async () => {
    const nftContract =  connectContract({
      address: ADDRESS.NFTADDRESS,
      abi: ABI.NFTABI
    })

    if (!nftContract) return;
    const approval = await nftContract.isApprovedForAll(address, ADDRESS.STAKING);
    if (!approval) {
      const approve = await nftContract.setApprovalForAll(ADDRESS.STAKING, true);
      await approve.wait();
    }

    const contract = connectContract({
      address: ADDRESS.STAKING,
      abi: ABI.STAKINGABI
    });

    if (!contract) return;
    return contract.stakeNFT(query._id, '1')
  }

  const { execute: handleStake, status } = useAsync(
    mintItem,
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
        title: 'Staking started',
        message: 'Successfully staking',
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
    false
  );


  return (
    <div>
      <LoadingOverlay visible={status === 'pending'} overlayBlur={2} />
      <Title order={3}>Your about to stake this NFT.</Title>
      <Space h={24} />
      <Grid columns={24}>
        <Grid.Col sm={12} md={10} lg={6}>
          <NFTCardNoAction
            title="Indoor Compost NFT"
            description="To create and provide a sustainable ecosystem that supports waste management, recycling items, and indoor plantations Power the echosystem by NFT."
          />
        </Grid.Col>
        <Grid.Col offsetSm={2} sm={10} md={12} lg={10}>
          <TextInput disabled label="Token Id" placeholder={query._id as string} size="md" radius="md" mb={8} />
          <TextInput disabled label="Amount" placeholder="1" size="md" radius="md" />
          <Button fullWidth mt={24} radius="md" size="md" onClick={handleStake}>Start Staking</Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default StakeItem;