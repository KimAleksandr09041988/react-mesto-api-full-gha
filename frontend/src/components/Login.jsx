import React from "react";
import FormPage from "./FormPage";
import { FormValueContext } from './contexts/FormVaueContext';

export default function Login({ onChange, onSubmit }) {
  const formValue = React.useContext(FormValueContext);

  return (
    <main>
      <FormPage
        title='Вход'
        btnDescription='Войти'
        email={formValue.email}
        password={formValue.password}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </main>
  )
}
