import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {loginTC} from "../../state/auth-reducer";
import {Navigate} from "react-router-dom";

export const Login = () => {
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
            console.log(values)
            dispatch(loginTC({password: values.password, email: values.email, rememberMe: values.rememberMe}))
            formik.resetForm()
        },
    })
    if (isLoggedIn) return <Navigate to={"/"}/>



    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   autoComplete={"username"}
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   autoComplete={"current-password"}
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox
                                              name="rememberMe"
                                              onChange={formik.handleChange}
                                              checked={formik.values.rememberMe}
                                          />}

                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}