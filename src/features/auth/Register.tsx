import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AlertTitle, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-toastify';


export default function Register() {

    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState<any[]>([]);

    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    });

    return (
        <Container component={Paper} maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit((data: any) =>
                agent.Auth.register({ email: data['email'], password: data['password'] })
                    .then(() => {
                        toast.success('Registration succeful - you can now log in');
                        navigate('/login');
                    })
                    .catch((error:any) => setValidationErrors([error?.data?.message!])))} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    {...register('email', { required: 'Email is required' })}
                    error={!!errors.email}
                    helperText={errors?.email?.message?.toString()}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors?.password?.message?.toString()}
                />
                {validationErrors.length > 0 &&
                    <Alert severity='error'>
                        <AlertTitle>Validation errors</AlertTitle>
                        <List>
                            {validationErrors.map(error => (
                                <ListItem key={error}>
                                    <ListItemText>{error}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Alert>
                }
                <LoadingButton
                    disabled={!isValid}
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/login'>
                            {"Already have an account? Sign in"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}