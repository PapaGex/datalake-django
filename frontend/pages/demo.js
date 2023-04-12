import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { loginUser } from '.././redux/reducers/auth/authActions';

const Demo = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  dispatch(
    loginUser({
        username: 'demo',
        password: 'qwer@1234'
      },
      router
    ))

  return <div>Loading...</div>;
};

export default Demo;