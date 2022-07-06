import { useEffect, useState } from "react";
import styled from "styled-components";
import { Theme, H5, BorderRadius } from "../../utils";
import { useWeb3React } from "@web3-react/core";
import { Provider } from "../../utils/provider";
import { BigNumber, Contract, ethers } from "ethers";
import * as MyLiliusContracts from '../../config/contracts/mylilius';

const CreateDigitallyOptimizedTwinFormContainer = styled.div`
    width: 100%;
    border: 1px solid ${Theme.colors.background};
    height: 100%;
    margin: 8px 0;
    ${BorderRadius()};
`;

const DotNameInput = styled.input`
    height: 35px;
    width: 90%;
    margin: 16px 5%;
    ${BorderRadius()};
    border: 1px solid ${Theme.colors.primary};
    background: none;
    text-align: center;
`;

interface ICreateDOTButtonProps {
    canCreate: boolean;
}

const CreateDOTNameButton = styled.button<ICreateDOTButtonProps>`
    width: 90%;
    margin: 16px 5%;
    height: 35px;
    ${BorderRadius()};
    border: none;
    background: ${props => props.canCreate ? Theme.colors.primary : 'grey'};
    color: white;
`;

interface ICDOTWProps {
    setHasDOT: Function;
}

const CreateDigitallyOptimizedTwinForm = ({ setHasDOT }: ICDOTWProps) => {

    const { account, chainId, provider } = useWeb3React<Provider>();

    const [canCreate, setCanCreate] = useState<boolean>(false);
    const [creatingDOT, setCreatingDOT] = useState<boolean>(false);
    const [dotName, setDotName] = useState<string>('');

    useEffect(() => {
        const switchToMylilius = () => {
            if (chainId !== 1258188407) {
                if (provider) {
                    provider.provider.request!({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: ethers.utils.hexValue(BigNumber.from(1258188407)) }]
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }
            }
        }
        switchToMylilius();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chainId])

    useEffect(() => {
        setCanCreate(dotName.length >= 3);
    }, [dotName]);

    const createDOT = async() => {
        try {
            const dotNameService: Contract = new Contract(MyLiliusContracts.DotNameServiceAddress, MyLiliusContracts.DotNameServiceABI, provider?.getSigner());
            const dotCreate: Contract = new Contract(MyLiliusContracts.DotCreate, MyLiliusContracts.DotCreateABI, provider?.getSigner());

            const txHash: string = await dotCreate.createDOT(dotName);
            console.log("Tx Hash: ", txHash);
            setCreatingDOT(true);
            
            
            setTimeout(async() => {
                const dotIsClaimed: boolean = await dotNameService.callStatic.dotIsClaimed(account);
                console.log("DOT Is Claimed", dotIsClaimed);
                setHasDOT(dotIsClaimed);
            }, 2500);
            
        } catch (err) {
            setCreatingDOT(false);
            alert("Error Creating DOT");
        }

    }

    if (creatingDOT) {
        return (
            <CreateDigitallyOptimizedTwinFormContainer>
                Creating DOT
            </CreateDigitallyOptimizedTwinFormContainer>
        );
    }

    return (
        <CreateDigitallyOptimizedTwinFormContainer>
            <H5 customStyle="margin: 16px 5% 8px 5%;">Create Digitally Optimized Twin</H5>
            <DotNameInput type="text" placeholder='Ex. TheGreatAxios' onChange={(e) => {
                e.preventDefault();
                setDotName(e.target.value);
            }} />
            {!creatingDOT && chainId === 1258188407 && <CreateDOTNameButton canCreate={canCreate} onClick={async(e) => {
                e.preventDefault();
                if (canCreate) {
                    await createDOT();
                    /// Create DOT Goes Here
                    /// Handle Setting After
                }
            }}>Create Digitally Optimized Twin</CreateDOTNameButton>}
        </CreateDigitallyOptimizedTwinFormContainer>
    );
}


export {
    CreateDigitallyOptimizedTwinForm
}