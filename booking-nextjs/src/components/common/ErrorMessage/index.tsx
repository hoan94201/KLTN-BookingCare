import React, { ReactNode } from 'react';

export type ErrorMessageProps = {
  error?: ReactNode;
};
const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <>{error && <p className="mt-2 text-danger text-sm ml-1">{error}</p>}</>
  );
};

export default ErrorMessage;
