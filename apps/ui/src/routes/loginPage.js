import { Container} from '@mui/material';
import { LoginBox } from '../components/login';

export default function LoginPage() {
    return (
        <>
            <Container alignItems="center" justifyContent="center">
                <LoginBox />
            </Container>
        </>
    );
}
