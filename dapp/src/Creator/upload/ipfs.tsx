import { H5, Text } from '../../utils';
import styled from 'styled-components';

const IPFSContainer = styled.div`
    width: 85%;
    height: auto;
    padding: 0 0 4px 0;
    margin: 16px 0 0 16px;
    border-bottom: 2px solid grey;
`;

interface IProps {
  id: any;
  version: string;
  isOnline: boolean | undefined;
  ipfs: any;
}

const IpfsComponent = ({ id, version, isOnline, ipfs }: IProps) => {
  

  if (!ipfs || !id) {
    return <h4>Connecting to IPFS...</h4>
  }

  return (
    <IPFSContainer>
      <H5>IPFS (File Storage) Connection</H5>
      <Text data-test="id">ID: {id.toString()}</Text>
      <Text data-test="version">Version: {version}</Text>
      <Text data-test="status">Status: {isOnline ? 'Online' : 'Offline'}</Text>
    </IPFSContainer>
  )
}

export default IpfsComponent