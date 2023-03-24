import NFTCard from "@/components/NFTCard";
import { ABI, ADDRESS } from "@/constant";
import useAsync from "@/hooks/useAsync";
import connectContract from "@/utils/connect";
import { Grid, LoadingOverlay, Space, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const Mint = () => {
  const mintItem = async () => {
    const { NFTABI } = ABI;
    const contract = connectContract({
      address: ADDRESS.NFTADDRESS,
      abi: NFTABI
    });
    if (!contract) return;
    const price = await contract.mintPrice();

    return contract.mint(1, { value: price })
  }

  const { execute: handleMint, status } = useAsync(
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
        title: 'Transaction completed',
        message: 'Successfully purchase',
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
      <Title order={3}>Mint</Title>
      <Space h={24} />
      <Grid columns={24}>
        <Grid.Col sm={12} md={8} lg={8} xl={6}>
          <NFTCard
            isMint
            title="Indoor Compost NFT"
            description="To create and provide a sustainable ecosystem that supports waste management, recycling items, and indoor plantations Power the echosystem by NFT."
            imageSrc="https://nft-cdn.alchemy.com/eth-goerli/c7402ced0a8fc2745d5f83d918c96263"
            tokenId=""
            cbMint={handleMint}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default Mint;