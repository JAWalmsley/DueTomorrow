import { Container, Box } from '@mui/material';
import { LoginBox } from '../components/LoginBox';

export default function LoginPage() {
    return (
        <>
            <Container>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="90vh"
                >
                    <LoginBox />
                </Box>
            </Container>
        </>
    );
}
