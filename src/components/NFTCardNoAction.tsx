import { Button, Card, Text, Title } from "@mantine/core";
import Image from "next/image";

interface IProps {
  title: string;
  description: string;
}

const NFTCardNoAction = ({ title, description }: IProps) => {
  return (
    <Card withBorder shadow='md' radius='md' p={32}>
      <Card.Section>
        <Card.Section sx={{ position: 'relative' }} h={200}>
          <Image
            alt=''
            src='https://ipfs.io/ipfs/bafybeihibk7xdn5fz2ypgazwfrbf7e77amskqgmfb3h4uvnrfta4w7t6vu'
            fill
          />
        </Card.Section>
      </Card.Section>
      <Card.Section py={8}>
        <Title order={4} mb={8} lineClamp={1}>{title}</Title>
        <Text lineClamp={3}>{description}</Text>
      </Card.Section>
    </Card>
  );
}

export default NFTCardNoAction;