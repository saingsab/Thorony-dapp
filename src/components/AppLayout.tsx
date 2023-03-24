import { AppShell, Container } from "@mantine/core";
import { ReactNode } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar />}
      header={<Header />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Container size={1280} py={24}>
        {children}
      </Container>
    </AppShell>
  );
}

export default AppLayout;