type FormErrorProps = {
  error: string | undefined;
};

const FormError = (props: FormErrorProps): JSX.Element | null => {
  if (!props.error) {
    return null;
  }
  return <div className="text-red-600">{props.error}</div>;
};

export default FormError;
