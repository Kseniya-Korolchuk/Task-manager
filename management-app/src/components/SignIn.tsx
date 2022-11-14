import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, CssBaseline, Typography, Container, TextField, Box } from '@mui/material';
import formStyles from './scss/Form.module.scss';
import typographyStyles from './scss/Typography.module.scss';
import mainStyles from './scss/MainContainer.module.scss';

function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = (data: FieldValues) => {
    console.log(data);
    reset();
  };

  return (
    <Container component="main" maxWidth="xs" className={mainStyles.mainContainer}>
      <CssBaseline />
      <Box className={formStyles.formContainer}>
        <Typography component="h2" variant="h4" className={typographyStyles.h2}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit(formSubmit)} sx={{ mt: 1 }}>
          <Box className={formStyles.labelWrapper}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              {...register('login', {
                required: 'Please, enter login',
                minLength: { value: 3, message: 'Login must be more than 3 symbols' },
              })}
              autoComplete="Login"
              className={formStyles.validatedInput}
            />
            {errors.login && (
              <Typography
                component="p"
                align="center"
                variant="caption"
                className={formStyles.validationAlert}
              >
                {errors.login.message as string}
              </Typography>
            )}
          </Box>
          <Box className={formStyles.labelWrapper}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="Password"
              {...register('password', {
                required: 'Please, enter password',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: 'Eight characters, at least one letter and one number',
                },
              })}
              autoComplete="Password"
              className={formStyles.validatedInput}
            />
            {errors.password && (
              <Typography
                component="p"
                align="center"
                variant="caption"
                className={formStyles.validationAlert}
              >
                {errors.password.message as string}
              </Typography>
            )}
          </Box>
          <Typography component="p" align="center">
            Do not have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
          <Button variant="contained" type="submit" fullWidth>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
