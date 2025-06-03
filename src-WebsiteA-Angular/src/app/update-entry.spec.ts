import { UpdateEntry } from './update-entry';

describe('UpdateEntry', () => {
  it('should create an instance', () => {
    expect(new UpdateEntry()).toBeTruthy();
  });

  it('[Create - Check ]',() => {
    const request : UpdateEntry = {
      FirstName : "Dhurfa",
      LastName : "Najima",
      Admission : "2019-01-05T09:05:05.035Z",
      PracticingArea : "Guindy",
      PracticeLocation : "Chennai"
    };
    expect(UpdateEntry).not.toBeNull();
  });
});
