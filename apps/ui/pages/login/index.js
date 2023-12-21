import { Container, Box } from '@mui/material';
import { LoginBox } from './components/LoginBox';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
    const searchParams = useSearchParams();
    let redirect = searchParams.get('redirect');
    if (!redirect) {
        redirect = '/';
    }
    return (
        <>
            <Container>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="90vh"
                >
                    <LoginBox redirect={redirect} />
                </Box>
            </Container>
        </>
    );
}
