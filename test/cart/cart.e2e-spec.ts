import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';

describe('CART endpoints tests', () => {
  const TEST_USER_NAME2 = 'badirusubomi-22';
  const TEST_USER_PASSWORD = 'password';
  let app: INestApplication;
  let accessToken;
  let accessToken2;
  let cartId;
  let itemId;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

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
    cartId = signupResponse.body.user.cart._id;
  });

  it('Add item to cart', async () => {
    // Add item to Cart
    const cartAddResponse = await request(app.getHttpServer())
      .post(`/cart/${cartId}`)
      .send({
        name: 'Milk',
        description: 'Non Dairy',
        quantity: 20,
      })
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(201);

    itemId = cartAddResponse.body.item.id;

    // Add Another item to Cart
    const cartAddResponse2 = await request(app.getHttpServer())
      .post(`/cart/${cartId}`)
      .send({
        name: 'Onions',
        description: 'Non Dairy',
        quantity: 400,
      })
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(400);
  });

  it('Modify Cart Item', async () => {
    const cartPatchResponse = await request(app.getHttpServer())
      .patch(`/cart/${cartId}`)
      .send({
        groceryItemId: itemId,
        name: 'Milk',
        quantity: 99,
        description: 'Non dairy - Modified description 2',
      })
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('Unauthorized Cart access', async () => {
    //Signup - new user
    const signupResponse = await request(app.getHttpServer())
      .post('/user/signup')
      .send({
        username: `${TEST_USER_NAME2}-new`,
        password: TEST_USER_PASSWORD,
      })
      .expect(201);

    // Login - new user
    const loginResponse = await request(app.getHttpServer())
      .post('/user/login')
      .send({
        username: `${TEST_USER_NAME2}-new`,
        password: TEST_USER_PASSWORD,
      })
      .expect(201);

    accessToken2 = loginResponse.body.accessToken;
    let cartId2 = signupResponse.body.user.cart._id;
    const cartPatchResponse = await request(app.getHttpServer())
      .get(`/cart/${cartId2}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('Delete Item', async () => {
    const cartDeleteResponse = await request(app.getHttpServer())
      .patch(`/cart/${cartId}`)
      .send({
        groceryItemId: itemId,
        reason: 'Testing application',
      })
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  afterAll(async () => {
    // Delete user 1
    await request(app.getHttpServer())
      .delete('/user')
      .set('Authorization', `Bearer ${accessToken}`);

    // Delete user 2
    await request(app.getHttpServer())
      .delete('/user')
      .set('Authorization', `Bearer ${accessToken2}`);
    await app.close();
  });
});
