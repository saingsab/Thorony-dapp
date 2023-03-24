import { ActionIcon, createStyles, getStylesRef, Group, Navbar, SimpleGrid, Title } from "@mantine/core";
import { IconBusinessplan, IconHammer, IconHome2 } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const tabs = {
  general: [
    { link: '/', label: 'Home', icon: <IconHome2 /> },
    { link: '/mint', label: 'Mint', icon: <IconHammer /> },
    { link: '/stake', label: 'Stake', icon: <IconBusinessplan /> },
  ],
};

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },
  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  }
}));

const NavbarComponent = () => {
  const { pathname } = useRouter();

  const { classes, cx } = useStyles();

  const links = tabs.general.map((item) => (
    <SimpleGrid cols={1} mt={8} key={item.label}>
      <Link 
        href={item.link} 
        className={cx(classes.link, { [classes.linkActive]: item.link === pathname })}
      >
        <Group align='center'>
          <ActionIcon variant="light" color="primary" size="md" p={4}>{item.icon}</ActionIcon>
          <Title order={5}>{item.label}</Title>
        </Group>
      </Link>
    </SimpleGrid>
  ))

  return (
    <Navbar width={{ base: 300 }}>
      <Navbar.Section>

      </Navbar.Section>
      <Navbar.Section grow mt={'lg'} px={24}>
        {links}
      </Navbar.Section>
    </Navbar>
  );
}

export default NavbarComponent;