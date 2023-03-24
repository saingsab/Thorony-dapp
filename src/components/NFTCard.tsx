import { ADDRESS } from "@/constant";
import { Anchor, Button, Card, Image, Text, Title } from "@mantine/core";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

interface IProps {
  title: string;
  description: string;
  imageSrc: string;
  isMint?: boolean;
  tokenId: string;
  cbMint?: () => void;
}

const NFTCard = ({ title, description, imageSrc, isMint, cbMint, tokenId }: IProps) => {
  return (
    <Card withBorder shadow='md' radius='md' p={32} sx={{ height: 'inherit' }}>
      <Card.Section>
        <Card.Section sx={{ position: 'relative' }} h={200}>
          <Image
            alt=''
            src={imageSrc}
            fit="cover"
            height={200}
            withPlaceholder
          />
        </Card.Section>
      </Card.Section>
      <Card.Section py={16}>
        <Title lineClamp={1} order={4}>{title}</Title>
        <Text lineClamp={2}>{description}</Text>
      </Card.Section>
      <Card.Section>
        {isMint ? (
          <Button fullWidth radius='md' onClick={cbMint}>Mint</Button>
        ) : (
          <div>
            <Link href={`/stake/${tokenId}`}>
              <Button fullWidth radius='md'>Stake</Button>
            </Link>
            <Anchor href={`https://testnets.opensea.io/assets/goerli/${ADDRESS.NFTADDRESS}/${tokenId}`} target="_blank">
              <Button fullWidth radius='md' mt={8} variant='light' rightIcon={<IconArrowUpRight size={18} />}>Trade</Button>
            </Anchor>
          </div>
        )}
      </Card.Section>
    </Card>
  );
}

export default NFTCard;