import { FC, useCallback, useEffect, useState } from 'react';
import { Input, Button, AuthSocialButton } from '~/components';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { AuthVariant } from '~/interfaces/types';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import toast from 'react-hot-toast';
import AuthInputFields, { AuthDefaultValues as defaultValues } from '~/constants/auth';

const AuthPage: FC = () => {
  const [variant, setVariant] = useState<AuthVariant>('REGISTER');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = useCallback(() => {
    const v = variant === 'LOGIN' ? 'REGISTER' : 'LOGIN';
    setVariant(v);
  }, [variant]);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues
  })

  const socialAction = (action: string) => {
    setIsLoading(true);

    // Implement signIn
  }

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="col-v min-h-screen py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img height="72" width="72" alt="Logo" className="mx-auto" src="src/assets/images/logo.webp" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {variant === 'REGISTER' ? 'Sign up': 'Sign in to your account'}
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {AuthInputFields.map((field) => (
              (!field.showOnRegister || variant === 'REGISTER') && (
                <Input
                  key={field.id}
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  {...field}
                />
              )
            ))}
            <div>
              <Button disabled={isLoading} isFullWidth type="submit">
                {variant === 'LOGIN' ? 'Sign in' : 'Register'}
              </Button>
            </div>
          </form>
          <div className="mt-6 flex gap-2">
            {[
              { icon: BsGithub, provider: 'github' },
              { icon: BsGoogle, provider: 'google' }
            ].map((action, index) => (
              <AuthSocialButton
                key={index}
                icon={action.icon}
                onClick={() => socialAction(action.provider)}
              />
            ))}
          </div>
        </div>
        <div className="row-h gap-2 text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === 'LOGIN' ? 'New to this website?' : 'Already have an account?'}
          </div>
          <div
            onClick={toggleVariant}
            className="pointer text-sky-500"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage;
