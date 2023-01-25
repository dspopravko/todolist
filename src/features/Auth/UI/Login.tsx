import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useAppSelector } from "../../../state/store";
import { Navigate } from "react-router-dom";
import s from "./Login.module.css"
import { selectIsAuthPending, selectIsLoggedIn } from "../";
import { useActions } from "../../../hooks/useActions";
import { authActions } from "../index";

export const Login = () => {
  const pending = useAppSelector(selectIsAuthPending)
  const { login } = useActions(authActions)

  type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
  }

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: 'demid1498@gmail.com',
      password: 'Ex2X8KUZPbRnC!4',
      rememberMe: false
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (!/^.{3,}$/gm.test(values.password)) {
        errors.password = 'At least 3 symbols'
      }
      return errors
    },
    onSubmit: values => {
      login({ password: values.password, email: values.email, rememberMe: values.rememberMe })
      formik.resetForm()
    },
  })
  if (isLoggedIn) return <Navigate to={"/"} />

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel className={s.welcome}>
            <div className={s.a}>
              <p>To log in get registered&nbsp;
                <a rel='opener noreferrer' href={'https://social-network.samuraijs.com/'}
                   target={'_blank'}>here <br />
                </a> or use common test account credentials:
              </p>
            </div>
            <div className={s.b}>
              <p>
                Email: free@samuraijs.com<br />
                Password: free
              </p>
            </div>
          </FormLabel>
          <FormGroup>
            <TextField label="Email"
                       margin="normal"
                       autoComplete={"username"}
                       helperText={formik.touched.email && formik.errors.email}
                       error={formik.touched.email && !!formik.errors.email}
                       {...formik.getFieldProps('email')}
            />
            <TextField type="password"
                       label="Password"
                       margin="normal"
                       autoComplete={"current-password"}
                       helperText={formik.touched.password && formik.errors.password}
                       error={formik.touched.password && !!formik.errors.password}
                       {...formik.getFieldProps('password')}
            />
            <div className={s.labelWrapper}>

              <FormControlLabel label={'Remember me'}
                                sx={{
                                  marginLeft: 0,
                                  paddingTop: '6px',
                                  paddingBottom: '10px'
                                }}
                                control={<Checkbox
                                  name="rememberMe"
                                  onChange={formik.handleChange}
                                  checked={formik.values.rememberMe}
                                />}
              />
            </div>
            <Button disabled={pending === "loading"} type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
}