import { NavigationContainer } from "./styles";
import { NavigationTitle } from "./title";
import { Wallet } from '../../wallet';

const Navigation = () => {
    return (
        <NavigationContainer>
            <NavigationTitle />
            <Wallet />
        </NavigationContainer>
    )
}

export {
    Navigation
}