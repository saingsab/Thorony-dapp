import { ABI, ADDRESS } from '@/constant';
import connectContract from '@/utils/connect';
import { Button } from '@mantine/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { utils } from 'ethers';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export const CustomConnectButton = () => {
  const { address } = useAccount();
  const [TNTBalance, setTNTBalance] = useState('');

  const getBalanceTNT = async (address: string) => {
    try {
      if (!address) return;
      const contract = connectContract({
        address: ADDRESS.ERC20,
        abi: ABI.ERC20ABI
      });

      if (!contract) return;
      const balance = await contract.balanceOf(address);
      setTNTBalance(utils.formatEther(balance));
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    getBalanceTNT(address as string);
  }, [address])

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} radius="md">
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} radius="md">
                    Wrong network
                  </Button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <Button radius='md' disabled>
                    {chain.hasIcon && (
                      <div style={{ marginRight: '4px' }}>
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            width={18}
                            height={18}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>
                  <Button onClick={openAccountModal} radius='md'>
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${TNTBalance} TNT)`
                      : ''}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
