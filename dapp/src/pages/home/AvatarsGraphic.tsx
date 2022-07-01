import { H3, Text } from "../../utils/text";
import { AvatarsGraphicContainer, AvatarGraphicImage } from "./styles";
import AvatarGraphic from '../../assets/avatar_graphic_2.svg';

const AvatarsGraphic = () => {
    return (
        <AvatarsGraphicContainer className="home_container">
            <AvatarGraphicImage src={AvatarGraphic} />
        </AvatarsGraphicContainer>
    );
}

export {
    AvatarsGraphic
}