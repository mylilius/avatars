import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { H3 } from "../../utils";
import * as MyLiliusConfig from '../../config/contracts/mylilius';
import { CHAINS } from "../../config";
import { useWeb3React } from "@web3-react/core";
import { Provider } from "../../utils/provider";

const DotInformationContainer = styled.div`
    position: absolute;
    top: 1%;
    width: 100%;
    text-align: center;
`;

const DotName = styled(H3)``;

interface IDOT {
    name: string | undefined;
    address: string | undefined;
    id: string | undefined;
    birthday: number | undefined;
    experience: number | undefined;
    dotNumber: number | undefined;
}

const DotInformation = () => {

    const [dot, setDot] = useState<IDOT>({
        name: undefined,
        address: undefined,
        id: undefined,
        birthday: undefined,
        experience: undefined,
        dotNumber: undefined,
    })

    const { account } = useWeb3React<Provider>();

    const myliliusProvider = new ethers.providers.JsonRpcProvider(CHAINS[1258188407].urls[0]);
    const dotNameService: Contract = new Contract(MyLiliusConfig.DotNameServiceAddress, MyLiliusConfig.DotNameServiceABI, myliliusProvider);

    useEffect(() => {
        const loadDOT = async() => {
            const _dot = await dotNameService.callStatic.getDOTByAddress(account!);
            setDot({
                ...dot,
                name: _dot['name_display'],
                address: _dot['owner'],
                dotNumber: Number(_dot['number'])
            })
        }

        loadDOT();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DotInformationContainer>
            {dot.name && <DotName>{dot.name}</DotName>}
        </DotInformationContainer>
    );
}

export {
    DotInformation
}