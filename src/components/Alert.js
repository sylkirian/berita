import styled from 'styled-components';

const Alert = styled.div`
	color: ${props => props.error ? 'red' : 'green'};
	margin-bottom: 15px;
`

export default Alert;