import { H2, H3, SubTitle, Text } from "../../utils/text";
import { TextWelcomeContainer } from "./styles";

const TextWelcome = () => {
    return (
        <TextWelcomeContainer className="home_container">
            <H2>DOT Avatars</H2>
            <span style={{ height: '10px'}} />
            <SubTitle>Build Your Avatar. Be Yourself.</SubTitle>
        </TextWelcomeContainer>
    );
}

export {
    TextWelcome
}