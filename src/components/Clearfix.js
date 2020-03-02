import styled from 'styled-components';

const Clearfix = styled.div`
	width: 100%;
	&:after {
		content: "";
		clear: both;
		display: table;
	}
`

export const Left = styled.div`
	float: left;
`

export const Right = styled.div`
	float: right;
	text-align: right;
`

export default Clearfix;