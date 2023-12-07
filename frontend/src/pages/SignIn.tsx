import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInValidation } from '../utils/validations';
import { type IError, errorHandler } from '../utils/errorHandler';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../hooks/RTKhooks';
import { signInUser } from '../slice/authSlice';
import { useSignInQueryHook } from '../hooks/reactQueryHooks';

function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useSignInQueryHook();

  type Form = Zod.infer<typeof signInValidation>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(signInValidation),
  });

  const formSubmit = async (data: Form) => {
    try {
      const logUser = await mutateAsync(data);
      toast.success(`${logUser.name} logged in`);
      dispatch(signInUser(logUser));
      reset();
      navigate('/');
    } catch (error) {
      toast.error(errorHandler(error as IError));
    }
  };

  return (
    <div className="flex  justify-center">
      {/* Left side */}
      <div className=" hidden flex-[1.4] lg:block">
        <div>
          <img
            src="/login-bg.svg"
            height={500}
            width={500}
            className="mx-auto mt-5"
            alt="login bg error"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col w-[480px] space-y-5  justify-center p-8 rounded-lg border border-slate-200">
          <div className="space-y-2">
            <h1 className="font-bold text-2xl">Welcome to Task</h1>
            <p className="text-gray-800">Your way to your goals</p>
          </div>

          <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="email">
                Email
              </label>
              <input
                {...register('email')}
                type="text"
                id="email"
                className="w-full border border-slate-300 outline-blue-500 rounded-md p-2 "
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="password">
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                className="w-full border border-slate-300 outline-blue-500 rounded-md p-2 "
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <div>
              <button
                disabled={isPending}
                type="submit"
                className="btn-primary w-full disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <div className=" flex items-center justify-center gap-1">
                    <p>Sign In</p> <span className="spinner" />
                  </div>
                ) : (
                  ' Sign In'
                )}
              </button>
            </div>
          </form>

          <div className="gap-3 flex items-center">
            <p>New to Task?</p>
            <Link to="/signUp" className="text-blue-500">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
