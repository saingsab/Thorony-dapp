import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Grid, Space, Text, Title } from '@mantine/core'
import initSdk from '@/utils/initSDK';
import type { Nft } from 'alchemy-sdk';
import NFTCard from '@/components/NFTCard';
import Loading from '@/components/Loading';
import { useAccount } from 'wagmi';

export default function Home() {
  const { address } = useAccount();
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchRecentMint = async () => {
      setLoading(true);
      if (!address) return;
      const alchemy = await initSdk();

      await alchemy.nft.getNftsForOwner(address as string)
        .then(res => setNfts(res?.ownedNfts));
      
      setLoading(false);
    }
    fetchRecentMint();
  }, [address]);

  const NFTS = nfts.filter(item => item.contract.address === '0x8bc739d8def54afd87fbfc872cef60139320446e');

  return (
    <>
      <Head>
        <title>Thorony Staker</title>
        <meta name="description" content="Mint Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title order={3}>Home</Title>
        <Space h={24} />
        {loading ? (
          <Loading />
        ) : (
          <Grid columns={24}>
            {NFTS.length > 0 ? NFTS
              .map((item: any, index: number) => (
                <Grid.Col key={index} sm={12} md={8} lg={8} xl={6}>
                  <NFTCard
                    title={item.rawMetadata.name}
                    description={item.rawMetadata.description}
                    imageSrc={item.media[0]?.gateway}
                    tokenId={item.tokenId}
                  />
                </Grid.Col>
              )
            ): (
              <Grid.Col span={24}>
                <Text align='center'>No Data...</Text>
              </Grid.Col>
            )}
          </Grid>
        )}
      </main>
    </>
  )
}
