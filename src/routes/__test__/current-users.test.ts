import request from 'supertest';
import { app } from '../../app';

it('response with current user detail', async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie) // need to set manually supertest is not set cookie auto
    .send()
    .expect(200);

  expect(response.body.currentuser.email).toEqual('test@test.com');
});

it('response null if not authen', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentuser).toEqual(null);
});
