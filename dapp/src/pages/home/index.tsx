import { HomePageContainer } from "./styles";
import { TextWelcome } from "./TextWelcome";
import { AvatarsGraphic } from "./AvatarsGraphic";

const HomePage = () => {
    return (
        <HomePageContainer>
            <TextWelcome />
            <AvatarsGraphic />
        </HomePageContainer>
    );
}

export {
    HomePage
}