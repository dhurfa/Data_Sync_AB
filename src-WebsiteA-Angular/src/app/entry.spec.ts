import { Entry } from './entry';

describe('Entry', () => {
  it('should create an instance', () => {
    expect(new Entry()).toBeTruthy();
  });
  
  it('[Create - Check]', ()=>{
    const inputData : Entry = {
      Id : 1,
      FirstName : "Dhurfa",
      LastName : "Najima",
      Email : "dhurfas@gmail.com",
      Born : "1990-01-05T09:05:05.035Z",
      Admission : "2019-01-05T09:05:05.035Z",
      PracticingArea : "Guindy",
      PracticeLocation : "Chennai",
      Position : "Manager"
    };
    expect(Entry).not.toBeNull();
  });
  
});
