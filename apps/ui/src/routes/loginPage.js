import { Container, Box } from '@mui/material';
import { LoginBox } from '../components/login';

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
