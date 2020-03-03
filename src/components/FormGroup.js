import styled from 'styled-components';

const FormGroup = styled.div`
	margin-bottom: 2rem;
	& > label {
		display: inline-block;
		margin-bottom: 0.5rem;
	}
	& > input, & > textarea {
		box-sizing: border-box;
		display: block;
		padding: 0.5rem;
		width: 100%;
	}
`

export default FormGroup;