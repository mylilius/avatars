import styled from 'styled-components';
import { Flex, SubTitle, Text } from '../utils';

const WelcomeContainer = styled.div`
    ${Flex('column', 'flex-start', 'flex-start')};
`;

const SectionTitle = styled(SubTitle)`
    margin: 8px 0 8px 0;
    
`;
const SectionContent = styled(Text)`
    width: 75%;
    line-height: 1.5;
`;


const content: {[key: string]: {
    title: string;
    content: string;
}} = {
    intro: {
        title: 'Creator Program',
        content: 'Welcome to the DOT Avatar Creator Program! The program is free to join for everyone, whether you are an artist or not.'
    },
    goal_one: {
        title: 'Goal #1: Be Yourself. Be Free.',
        content: `
            The world has changed rapidly, and today, more than ever; the internet has become a place for many where they can portray themselves comfortably in a way they may not be able to in person.
            DOT Avatars are fully-customizable avatars that are built using NFTs. Individuals can now mix-and-match "building blocks" to build what they feel is the truest representation of themselves.
        `
    },
    goal_two: {
        title: 'Goal #2: Monetary Freedom',
        content: `
            Artists, Designers, and Creatives of all types (I apologize if I did not list yours explicitly) are some of the most talented people in the world. Yet, often working for themselves is financially impossible.
            While NFTs or Non-Fungible Tokens brought in the first wave of self-made artists; it also cleared the way for many to recognize the flaws in the existing process. Many artists currently rely on large collections that 
            take months and sometimes years to build out fully; and then they must sell the collection out to be successful. DOT Avatars represents a new way for artists to monetize their work by creating individual pieces that can 
            be sold directly to consumers for any price they feel is fair. It no longer requires an entire collection to sell; just one really amazing and innovative creative work to succeed.
        `
    },
    process: {
        title: 'The Process',
        content: 'The process to become a creator is simple. 1. Simply visit our templates page and download one or all of the Adobe files.\n 2. Choose what you want to create: head, body, legs, or full body. \n 3. Build your design in illustrator and export the file as an SVG. \n 4. Upload the file here on the Creator Portal and then list it on the marketplace.'
    },
    support: {
        title: 'Support',
        content: 'Every creator has the ability to upload 3 building blocks for free. After that you can purchase a Creator PRO NFT with creator wallet to unlock unlimited uploads!'
    }
}

const Welcome = () => {
    return (
        <WelcomeContainer>
            <SectionTitle>{content.intro.title}</SectionTitle>
            <SectionContent>{content.intro.content}</SectionContent>
            <SectionTitle>{content.goal_one.title}</SectionTitle>
            <SectionContent>{content.goal_one.content}</SectionContent>
            <SectionTitle>{content.goal_two.title}</SectionTitle>
            <SectionContent>{content.goal_two.content}</SectionContent>
            <SectionTitle>{content.process.title}</SectionTitle>
            <SectionContent>The process to become a creator is simple. <br/> 1. Simply visit our templates page and download one or all of the Adobe files.<br/> 2. Choose what you want to create: head, body, legs, or full body. <br/> 3. Build your design in illustrator and export the file as an SVG. <br/> 4. Upload the file here on the Creator Portal to create an NFT and then list it on the marketplace.</SectionContent>
            <SectionTitle>{content.support.title}</SectionTitle>
            <SectionContent>{content.support.content}</SectionContent>
        </WelcomeContainer>
    );
}

export {
    Welcome
}