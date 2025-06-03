import { LoginViewModel } from './login-view-model';

describe('LoginViewModel', () => {
  it('should create an instance', () => {
    expect(new LoginViewModel()).toBeTruthy();
  });

  it('[Class - Check]' ,() => {
    let inputData : LoginViewModel = {
      UserName : 'Rohit',
      Password : 'rohit123',
      Token : 'abcdefg'
    };
    expect(LoginViewModel).not.toBeNull();
  });
});