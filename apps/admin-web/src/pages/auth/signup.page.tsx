import
  {
    Button,
    Input,
    FieldGroup,
    Field,
    FieldLabel,
    FieldDescription,
    AuthFormHeader
  } from '@org/design-system';
import { useForm } from '@tanstack/react-form';
import { SignupSchema } from '@org/validation';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '@org/shared';

export function SignupPage()
{
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    validators: {
      onChange: SignupSchema,
    },
    onSubmit: async ({ value }) =>
    {
      // TODO: Wire up signup mutation
      console.log('Signup submitted:', value);
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
          title="Create an account"
          subtitle="Enter your details below to get started"
        />

        <form.Field
          name="name"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="John Doe"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors ? (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {field.state.meta.errors.join(', ')}
                </p>
              ) : null}
            </Field>
          )}
        />

        <form.Field
          name="email"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="m@example.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors ? (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {field.state.meta.errors.join(', ')}
                </p>
              ) : null}
            </Field>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
                  {field.state.meta.errors.join(', ')}
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
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>
            </Field>
          )}
        />

        <Field>
          <FieldDescription className="text-center mt-2">
            Already have an account?{" "}
            <Link to={ADMIN_ROUTES.LOGIN} className="underline underline-offset-4 hover:text-primary">
              Log in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
