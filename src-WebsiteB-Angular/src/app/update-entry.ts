export class UpdateEntry {
    [x: string]: string;
    FirstName : any;
    LastName : any;
    Admission : any;
    PracticingArea : any;
    PracticeLocation : any;


    constructor(){
        this.FirstName = '';
        this.LastName = '';
        this.Admission = 0 ;
        this.PracticingArea = '';
        this.PracticeLocation = '';
    }
}