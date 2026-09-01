import { useNavigate } from 'react-router-dom';
import { Button, Field, FieldDescription, FieldGroup, FieldLabel, Input, Separator, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, toast } from '@org/design-system';
import { useForm } from '@tanstack/react-form';
import { CreateOrganizationInput, BUSINESS_TYPES, BUSINESS_SIZE } from '@org/validation';
import { MERCHANT_ROUTES } from '@org/shared';
import { Info, ArrowRight, Building2, CloudUpload, ShoppingCart, Landmark, GraduationCap, HeartPulse, Utensils, Truck, Building, Briefcase } from 'lucide-react';
import { useRegisterOrganization, BusinessSize, BusinessType } from '@org/organization';

const BUSINESS_TYPE_ICONS: Record<string, React.ReactNode> = {
  RETAIL: <ShoppingCart className="size-4 text-muted-foreground" />,
  FINANCE: <Landmark className="size-4 text-muted-foreground" />,
  EDUCATION: <GraduationCap className="size-4 text-muted-foreground" />,
  HEALTHCARE: <HeartPulse className="size-4 text-muted-foreground" />,
  HOSPITALITY: <Utensils className="size-4 text-muted-foreground" />,
  LOGISTICS: <Truck className="size-4 text-muted-foreground" />,
  REAL_ESTATE: <Building className="size-4 text-muted-foreground" />,
  OTHER: <Briefcase className="size-4 text-muted-foreground" />,
};

export function OrganizationOnboardingPage()
{
  const navigate = useNavigate();
  const orgMutation = useRegisterOrganization();

  const form = useForm({
    defaultValues: {
      businessName: "",
      businessSize: "",
      businessType: "",
      logo: undefined
    } as CreateOrganizationInput,
    onSubmit: async ({ value }) =>
    {
      await orgMutation.mutateAsync({
        businessName: value.businessName,
        businessSize: value.businessSize as BusinessSize,
        businessType: value.businessType as BusinessType,
        logoUrl: value.logo
      }, {
        onSuccess: (data) =>
        {
          navigate(MERCHANT_ROUTES.ONBOARDING_PRODUCTS);
          toast.add({
            type: "success",
            title: "Organization created successfully",
            description: "You can now add products to your organization."
          })
        }
      })

    },
  });

  return (
    <div className='max-w-2xl mx-auto w-full mt-8 rounded-3xl shadow-xl bg-card md:p-10 p-10 flex flex-col gap-8'>
      <div className='flex flex-col justify-center items-center w-full gap-2'>
        <div className='bg-primary/40 p-2 rounded-md'>
          <Building2 className='text-primary size-10' />
        </div>
        <h1 className='font-bold md:text-3xl text-xl'>Create your organization</h1>
        <p className='text-center text-muted-foreground font-medium text-sm md:text-base'>Let's set up your organization profile.
          <span className='block text-center'>You can always change these details later
          </span>
        </p>
      </div>
      <Separator />
      <div>
        <form
        onSubmit={(e) =>
        {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}>
          <FieldGroup>
            <form.Field
              name="logo"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Organization Logo <span className="text-muted-foreground font-normal">(optional)</span></FieldLabel>
                  <div
                    className="w-full border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center py-10 px-4 gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => { /* Handle file upload logic */ }}
                  >
                    <div className="bg-primary/10 text-primary p-4 rounded-3xl">
                      <CloudUpload className="size-8" strokeWidth={2.5} />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-sm">Upload logo</p>
                      <p className="text-muted-foreground text-xs mt-1">PNG, JPG or SVG. Max size 2MB.</p>
                    </div>
                  </div>
                  {field.state.meta.errors ? (
                    <p className="text-[0.8rem] font-medium text-destructive">
                      {field.state.meta.errors.map((err: any) => typeof err === 'string' ? err : err?.message || JSON.stringify(err)).join(', ')}
                    </p>
                  ) : null}
                </Field>
              )}
            />

            <form.Field
              name="businessName"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Business Name</FieldLabel>
                  <FieldDescription>
                    This will be the name of your organization.
                  </FieldDescription>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Acme Corporation"
                    value={field.state.value}
                    onChange={(e: any) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="h-12!"
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
              name="businessType"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Business Type</FieldLabel>
                  <FieldDescription>
                    Select the industry that best describes your business.
                  </FieldDescription>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val as string)}
                  >
                    <SelectTrigger id={field.name} className="w-full h-12!">
                      {field.state.value ? (
                        <span data-slot="select-value" className="flex flex-1 text-left items-center gap-2">
                          {BUSINESS_TYPE_ICONS[field.state.value]}
                          <span>{BUSINESS_TYPES[field.state.value as keyof typeof BUSINESS_TYPES]}</span>
                        </span>
                      ) : (
                        <SelectValue placeholder="Select business type" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(BUSINESS_TYPES).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            {BUSINESS_TYPE_ICONS[key]}
                            <span>{label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors ? (
                    <p className="text-[0.8rem] font-medium text-destructive">
                      {field.state.meta.errors.map((err: any) => typeof err === 'string' ? err : err?.message || JSON.stringify(err)).join(', ')}
                    </p>
                  ) : null}
                </Field>
              )}
            />

            <form.Field
              name="businessSize"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Business Size</FieldLabel>
                  <FieldDescription>
                    Select the size of your organization.
                  </FieldDescription>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val as string)}
                  >
                    <SelectTrigger id={field.name} className="w-full h-12!">
                      {field.state.value ? (
                        <span data-slot="select-value" className="flex flex-1 text-left items-center gap-2">
                          <span>{BUSINESS_SIZE[field.state.value as keyof typeof BUSINESS_SIZE]}</span>
                        </span>
                      ) : (
                        <SelectValue placeholder="Select business size" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(BUSINESS_SIZE).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors ? (
                    <p className="text-[0.8rem] font-medium text-destructive">
                      {field.state.meta.errors.map((err: any) => typeof err === 'string' ? err : err?.message || JSON.stringify(err)).join(', ')}
                    </p>
                  ) : null}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex flex-col gap-4 mt-6">
            <div className="bg-primary/5 rounded-xl p-4 flex items-center gap-3 text-primary text-sm">
              <Info className="size-5 shrink-0" />
              <p>You can add more details and customize your organization settings after creation.</p>
            </div>

            <Button className="w-full h-12 text-base rounded-xl font-medium" type="submit">
              Create Organization & Continue
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
