import
{
  Button,
  Input,
  FieldGroup,
  Field,
  FieldLabel,
  AuthFormHeader
} from '@org/shell';
import { useForm } from '@tanstack/react-form';
import { LoginSchema } from '@org/validation';

export function LoginPage()
{
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async ({ value }) =>
    {
      // TODO: Wire up to your use-auth-store / mutations
      console.log('Login submitted:', value);
      
    },
  });

  return (
    <form
      onSubmit={(e) =>
      {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-6 w-full max-w-sm mx-auto"
    >
      <FieldGroup>
        <AuthFormHeader
          title="Login to your account"
          subtitle="Enter your email below to login to your account"
        />

        <form.Field
          name="identifier"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email or Employee Code</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="m@example.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors ? (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {field.state.meta.errors.map((err: any) => typeof err === 'string' ? err : err?.message || JSON.stringify(err)).join(', ')}
                </p>
              ) : null}
            </Field>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors ? (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {field.state.meta.errors.map((err: any) => typeof err === 'string' ? err : err?.message || JSON.stringify(err)).join(', ')}
                </p>
              ) : null}
            </Field>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Field>
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </Field>
          )}
        />


      </FieldGroup>
    </form>
  );
}
