import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';

describe('USER endpoints tests', () => {
  const TEST_USER_NAME2 = 'badirusubomi-22';
  const TEST_USER_PASSWORD = 'password';
  let app: INestApplication;
  let accessToken;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/signup endpoint and /user/login', async () => {
    //Signup
    const signupResponse = await request(app.getHttpServer())
      .post('/user/signup')
      .send({ username: TEST_USER_NAME2, password: TEST_USER_PASSWORD })
      .expect(201);

    // Login
    const loginResponse = await request(app.getHttpServer())
      .post('/user/login')
      .send({ username: TEST_USER_NAME2, password: TEST_USER_PASSWORD })
      .expect(201);
    accessToken = loginResponse.body.accessToken;
  });

  it('Bad login', async () => {
    // Login
    const loginResponse = await request(app.getHttpServer())
      .post('/user/login')
      .send({
        username: TEST_USER_NAME2,
        password: `${TEST_USER_PASSWORD}-wrong`,
      })
      .expect(401);
  });

  afterAll(async () => {
    await request(app.getHttpServer())
      .delete('/user')
      .set('Authorization', `Bearer ${accessToken}`);
    await app.close();
  });
});
