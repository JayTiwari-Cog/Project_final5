import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

 
@Injectable({  providedIn: 'root'
})
export class ButtonStateManagement {
    private disableSubject= new BehaviorSubject<boolean>(false);
    disable$ = this.disableSubject.asObservable();

    disableButton() {
        this.disableSubject.next(true);
    }
    enableButton(){
        this.disableSubject.next(false);
    }
}