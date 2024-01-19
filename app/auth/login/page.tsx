import React, { FunctionComponent } from 'react';
import {LoginForm} from "@/components/auth/login-form";

interface OwnProps {}

type Props = OwnProps;

const LoginPage: FunctionComponent<Props> = (props) => {

  return (
<LoginForm/>

  );
};

export default LoginPage;
