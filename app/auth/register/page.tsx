import React, { FunctionComponent } from 'react';
import {LoginForm} from "@/components/auth/login-form";
import {RegisterForm} from "@/components/auth/register-form";

interface OwnProps {}

type Props = OwnProps;

const RegisterPage: FunctionComponent<Props> = (props) => {

  return (
<RegisterForm/>

  );
};

export default RegisterPage;
