import { Container, Group, Header, Image, Title } from "@mantine/core";
import { CustomConnectButton } from "./ConnectButton";

const HeaderComponent = () => {
  return (
    <Header height={60} px={24}>
      <Group position="apart"  align='center' sx={{ height:'inherit' }}>
        <Group>
          <Image
            alt=''
            src={'https://i.ibb.co/nbY6J5x/logo.png'}
            height={50}
            width={50}
            fit='contain'
          />
          <Title order={3}>Thorony Staker</Title>
        </Group>
        <Group position="right" align='center' sx={{ height:'inherit' }}>
          <CustomConnectButton />
        </Group>
      </Group>
    </Header>
  );
}

export default HeaderComponent;
