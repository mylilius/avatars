import { useWeb3React } from '@web3-react/core';
import { AddEthereumChainParameter } from '@web3-react/types';
import { BigNumber, Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CHAINS } from '../../config';
import { BorderRadius, Flex, H5, SubText, Text, Theme } from '../../utils';
import { Provider } from '../../utils/provider';
import * as Astar from '../../config/contracts/astar';
import * as Polygon from '../../config/contracts/polygon';


const PurchaseUIContainer = styled.div`
    width: 100%;
    background: ${Theme.colors.background};
    min-height: 40vh;
    height: auto;
    ${BorderRadius()};
    position: relative;
`;

const TokenListContainer = styled.div`
    width: 40%;
    position: absolute;
    top: 15%;
    left: 5%;
    display: flex;
    ${Flex('row', 'center', 'space-between', 'wrap')};
    border-bottom: 2px solid grey;
    padding: 4px 0;
`;
const TokenName = styled(SubText)`
    width: 15%;
    text-align: left;
`;
const TokenBalance = styled(Text)`
    width: 40%;
    text-align: right;
`;

const PurchaseToken = styled.button`
    width: 25%;
    border: 1px solid ${Theme.colors.primary};
    background: none;
    color: white;
    padding: 4px 2px;
    ${BorderRadius()};
`;



const PurchaseUI = () => {

    const { account, chainId, provider } = useWeb3React<Provider>();
    const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
    const [badgeBalance, setBadgeBalance] = useState<BigNumber>(BigNumber.from(0));
    const [contract, setContract] = useState<ethers.Contract | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({
        native: false
    });

    const currency: AddEthereumChainParameter['nativeCurrency'] = CHAINS[chainId!].nativeCurrency;

    const astar: ethers.Contract = new ethers.Contract(Astar.CreatorAddress, Astar.CreatorABI);
    const polygon: ethers.Contract = new ethers.Contract(Polygon.CreatorAddress, Polygon.CreatorABI);


    useEffect(() => {
        if (provider) {
            if (chainId === 80001) {
                setContract(polygon.connect(provider.getSigner()));
            } else if (chainId === 81) {
                setContract(astar.connect(provider.getSigner()));
            }
        } else {
            alert('Error Loading Web3 Wallet');
        }
    }, [provider]);

    useEffect(() => {
        
        const setBalances = async() => {
            if (contract) {
                const _response: BigNumber[] = await Promise.all([
                    contract.callStatic.balanceOf(account),
                    provider!.getBalance(account!)
                ]);
                // const _balance: BigNumber = await contract.callStatic.balanceOf(account);
                // const _userBalance: BigNumber = await provider!.getBalance(account!);
                setBalance(_response[1]);
                setBadgeBalance(_response[0]);
            }
        }

        setBalances();
    
    }, [contract]);

    const postCallReturn = async(expected: BigNumber) : Promise<BigNumber> => {
        let _balance: BigNumber = await contract!.callStatic.balanceOf(account);
        if (_balance !== expected) {
            return postCallReturn(expected);
        }

        return _balance;
    }

    return (
        <PurchaseUIContainer>
            <H5 customStyle="position: absolute; left: 5%; top: 5%;">Purchase PRO Badge</H5>
            <Text customStyle="position: absolute; top: 5%; right: 5%;"># Badges Owned {badgeBalance.toString()}</Text>
            <TokenListContainer>
                <TokenName>{currency.name}</TokenName>
                <TokenBalance>{ethers.utils.formatEther(balance)} {currency.symbol}</TokenBalance>
                <PurchaseToken onClick={async (e) => {
                    setIsLoading({
                        ...isLoading,
                        native: true
                    });
                    try {
                        if (contract) {
                            const txHash: string = await contract.purchaseBadgeNative({
                                value: ethers.utils.parseEther('0.007')
                            });
                            
                            // setBadgeBalance(badgeBalance);
                            setIsLoading({
                                ...isLoading,
                                native: false
                            });
                        }
                    } catch (err) {
                        console.log(err);
                        alert("Error Purchasing Creator Badge");
                    }

                }}>{isLoading['native'] ? 'Purchasing...': `Purchase with ${currency.symbol}`}</PurchaseToken>
            </TokenListContainer>
        </PurchaseUIContainer>
    )
}

export {
    PurchaseUI
}