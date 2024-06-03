import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, AuthSocialButton } from '~/components';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { AuthVariant } from '~/interfaces/types';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import toast from 'react-hot-toast';
import AuthInputFields, { AuthDefaultValues as defaultValues } from '~/constants/auth';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useAuthStore } from '~/store/zustandStore';

const AuthPage: FC = () => {
  const [variant, setVariant] = useState<AuthVariant>('REGISTER');
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { authToken, setAuthToken, setUsername } = useAuthStore();

  const toggleVariant = useCallback(() => {
    const v = variant === 'LOGIN' ? 'REGISTER' : 'LOGIN';
    setVariant(v);
  }, [variant]);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues
  })

  /**
   * Logs in user, either with credentials or social providers.
   * @param {string} authToken - auth token for authorization.
   * @param {string} username - user identifier (username for credentials and login for social providers).
   */
  const loginUser = (authToken: string, username: string): void => {
    const status = variant === 'LOGIN' ? 'logged in' : 'signed up';
    toast.success(`Successfully ${status}`);
    setAuthToken(authToken);
    setUsername(username);
    navigate('/');
  }

  const getAccessToken = async (code) => {
    const response = await axios.post(`${import.meta.env.VITE_API_SOCIALS_URL}/get_access_token`, { code });
    return response.data;
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (!code) {
      return;
    }

    // To do: move to react-query mutations
    axios.post(`${import.meta.env.VITE_API_SOCIALS_URL}/get_access_token`, { code })
      .then((response: AxiosResponse) => {
        const { auth_token, username } = response.data;
        loginUser(auth_token, username)
      })
      .catch((err: AxiosError) => {
        console.error(err)
        toast.error(`Failed to sign in with github`, { id: 'failed-github-sign-in' })
      })
      .finally(setIsPageLoading(false));
  }, []);

  const socialAction = (action: string) => {
  // To do: use react-query mutation
    setIsPageLoading(true);

    if (action === 'github') {
      window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_ID}`);
    }
    // Implement signIn
    if (action === 'google') {
      window.location.assign('https://accounts.google.com/o/oauth2/v2/auth?client_id=205119235639-lacd9587il1kh8d1gv016vq18ekeh72u.apps.googleusercontent.com&redirect_uri=http://localhost:5000/auth/google&response_type=code&scope=openid%20profile%20email&access_type=offline')
    }
  }

  // To do give it type
  const postUser = async (user: FieldValues): Promise<AxiosResponse> => {
    const userUrl = 
      variant === 'REGISTER' 
        ? `${import.meta.env.VITE_API_BASE_URL}/users`
        : `${import.meta.env.VITE_API_BASE_URL}/users/sign-in`;
    const response = await axios.post(userUrl, user);

    return response;
  }

  const mutation = useMutation(postUser, { 
    onSuccess: (response: AxiosResponse) => loginUser(response.data.auth_token, response.data.username),
    onError: (error: AxiosError) => {
      let errorMessage = error.message;
      if (error?.response?.data) {
        errorMessage = typeof(error.response.data) === 'string' ? error.response.data : error.response.data.message;
      }
      toast.error(errorMessage, { id: 'unsuccessful-request' });
      setIsPageLoading(false);
    },
    onSettled: () => setIsPageLoading(false),
  });

  const onSubmit: SubmitHandler<FieldValues> = (formValues: FieldValues) => {
    setIsPageLoading(true);
    mutation.mutate(formValues);
  }

  /**
   * After loading, enable page interaction.
   * Go back to index page if got token (since didn't install Redux for middleware route guard to reduce bundle size).
   */
  useEffect(() => {
    setIsPageLoading(false);
    if (authToken) {
      navigate('/');
    }
  }, []);

  return (
    <div className="col-v min-h-screen py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img height="72" width="72" alt="Logo" className="mx-auto" src="src/assets/images/logo.webp" />
        <h2 className="mt-6 text-center text-7xl rage bold tracking-wide text-gray-900">
          {variant === 'REGISTER' ? 'Sign up': 'Sign in to your account'}
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={ handleSubmit(onSubmit) }>
            {AuthInputFields.map((field) => (
              (!field.showOnRegister || variant === 'REGISTER') && (
                <Input
                  key={field.id}
                  disabled={isPageLoading}
                  register={register}
                  errors={errors}
                  required
                  {...field}
                />
              )
            ))}
            <div>
              <Button disabled={isPageLoading} isFullWidth type="submit">
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
        <div className="row-h gap-2 text-md mt-6 px-2 text-gray-500">
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
