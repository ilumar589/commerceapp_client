import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoginRequest } from '../../app/models/auth';
import { useState } from 'react';
import agent from '../../app/api/agent';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';


export default function Login() {
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid }} = useForm({
        mode: 'onChange'
    });

    async function submitForm(data: FieldValues) {
        await agent.Auth.login({email: data['email'], password: data['password']})
            .then(jwtResponse => console.log(jwtResponse));
    }

    return (
        <Container component={Paper} maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    {...register('email', {required: 'Email is required'})}
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
                    {...register('password', {required: 'Password is required'})}
                    error={!!errors.password}
                    helperText={errors?.password?.message?.toString()}
                />
                <LoadingButton
                    disabled={!isValid}
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/register'>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}