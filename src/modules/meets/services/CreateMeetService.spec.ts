// import AppError from '@shared/errors/AppError';

// describe('CreateUser', () => {
//   beforeEach(() => {
//     fakeUsersRepository = new FakeUsersRepository();
//     fakeHashProvider = new FakeHashProvider();
//     fakeCacheProvider = new FakeCacheProvider();
//     createUser = new CreateUserService(
//       fakeUsersRepository,
//       fakeHashProvider,
//       fakeCacheProvider,
//     );
//   });

//   it('should be able to create a new user', async () => {
//     const user = await createUser.execute({
//       email: 'rogerioctf@gmail.com',
//       name: 'Roger',
//       password: '123456',
//     });

//     expect(user).toHaveProperty('id');
//   });

//   it('should not be able to create a new user with same email from another', async () => {
//     await createUser.execute({
//       email: 'rogerioctf@gmail.com',
//       name: 'Roger',
//       password: '123456',
//     });

//     await expect(
//       createUser.execute({
//         email: 'rogerioctf@gmail.com',
//         name: 'Roger',
//         password: '123456',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });
// });
