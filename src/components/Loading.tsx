import { Center, Loader } from "@mantine/core";

const Loading = () => {
  return (
    <Center py={16}>
      <Loader variant="bars" />
    </Center>
  );
}

export default Loading;