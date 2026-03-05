import { http } from 'msw';
import { getGameServerUrl } from '@/lib/utils';
import { RefreshTokenEntity, SignInDto, SignInEntity, SignUpDto } from '@/types/auth';
import { createErrorResponseMock, createResponseMock, generateJwt } from '../helper';
import { User } from '@/types/user';

const userConfirmed: User = {
  id: '1',
  nickName: 'confirmed',
  email: 'verified@murka.com',
  avatar: 'https://avatars.githubusercontent.com/u/1234567890?v=4',
  status: 'CONFIRMED'
};

const userUnconfirmed: User = {
  id: '2',
  nickName: 'unconfirmed',
  email: 'not_verified@murka.com',
  avatar: 'https://avatars.githubusercontent.com/u/1234567890?v=4',
  status: 'CREATED'
};

const userGoogle: User = {
  id: '3',
  nickName: 'google',
  email: 'google@murka.com',
  avatar: 'https://avatars.githubusercontent.com/u/1234567890?v=4',
  status: 'CONFIRMED'
};

const userFacebook: User = {
  id: '3',
  nickName: 'facebook',
  email: 'facebook@murka.com',
  avatar: 'https://avatars.githubusercontent.com/u/1234567890?v=4',
  status: 'CONFIRMED'
};

const users: User[] = [userConfirmed, userUnconfirmed, userGoogle];

export const authHandlers = [
  http.post(getGameServerUrl('auth/sign-up'), async ({ request }) => {
    const data = await request.json() as SignUpDto;
    const hasEmail = users.some(user => user.email === data.email);

    if (hasEmail) {
      return createErrorResponseMock('User already exists', 'userAlreadyExists');
    }

    users.push({
      id: String(users.length + 1),
      nickName: 'newUser',
      email: data.email,
      avatar: 'https://avatars.githubusercontent.com/u/1234567890?v=4',
      status: 'CREATED'
    });

    return createResponseMock({ status: true });
  }),

  http.post(getGameServerUrl('auth/sign-in'), async ({ request }) => {
    const data = await request.json() as SignInDto;
    const user = users.find(user => user.email === data.email);

    if (!user) {
      return createErrorResponseMock('User not found', 'userNotFound');
    }

    return createResponseMock<SignInEntity>({
      jwtSession: {
        accessToken: await generateJwt(user, '1h'),
        refreshToken: await generateJwt(user),
      },
      user,
    });
  }),

  http.post(getGameServerUrl('auth/refresh-token'), async () => {
    return createResponseMock<RefreshTokenEntity>({
      accessToken: await generateJwt(userConfirmed, '1m'),
      refreshToken: await generateJwt(userConfirmed),
    });
  }),

  http.post(getGameServerUrl('auth/google'), async () => {
    return createResponseMock<SignInEntity>({
      jwtSession: {
        accessToken: await generateJwt(userGoogle, '1m'),
        refreshToken: await generateJwt(userGoogle),
      },
      user: userGoogle,
    });
  }),

  http.post(getGameServerUrl('auth/confirm-email'), async () => {
    return createResponseMock({ status: false });
  }),

  http.post(getGameServerUrl('auth/forgot-password'), async () => {
    return createResponseMock({ status: true });
  }),

  http.post(getGameServerUrl('auth/reset-password'), async () => {
    return createResponseMock({ status: true });
  }),

  http.post(getGameServerUrl('auth/facebook'), async () => {
    return createResponseMock<SignInEntity>({
      jwtSession: {
        accessToken: await generateJwt(userFacebook, '1m'),
        refreshToken: await generateJwt(userFacebook),
      },
      user: userFacebook,
    });
  }),

];
