import { SignUpViewModel } from './sign-up-view-model';

describe('SignUpViewModel', () => {
  it('should create an instance', () => {
    expect(new SignUpViewModel()).toBeTruthy();
  });

  it('[Class - Check]' ,() => {
    let inputData : SignUpViewModel = {
      UserName : 'Rohit',
      Password : 'rohit123',
    };
    expect(SignUpViewModel).not.toBeNull();
  })
});
