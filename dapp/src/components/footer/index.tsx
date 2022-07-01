import { Text } from "../../utils/text";
import { FooterContainer } from "./styles";

const Footer = () => {
    return (
        <FooterContainer>
            <Text customStyle="color: grey;">&copy; Copyright Lilius, Inc 2022-Present. Powered by MyLilius.</Text>
        </FooterContainer>
    )
}

export {
    Footer
}