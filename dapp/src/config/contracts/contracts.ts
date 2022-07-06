import * as ASTAR from './astar';
import * as Polygon from './polygon';


interface IContractParams {
    address: string;
    abi: any;    
}

export const getAvatarManager = (chainId: number) : IContractParams => {
    if (chainId === 81) {
        return {
            address: ASTAR.AvatarManagerAddress,
            abi: ASTAR.AvatarManagerABI
        };
    } else {
        return {
            address: Polygon.AvatarManagerAddress,
            abi: Polygon.AvatarManagerABI
        }
    }
}