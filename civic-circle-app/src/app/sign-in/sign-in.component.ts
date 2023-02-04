import { Component } from '@angular/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth, userData } from 'src/globals';
import { collection, getDocs, query } from 'firebase/firestore';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  onSubmit(myForm: NgForm) {
    console.log("Submit")
    console.log(myForm.value);
    console.log(myForm.valid);
  }

  signin(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed into user account, redirect here
        const ref = collection(db, 'user');
        let q = query(ref);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.id == userCredential.user.email) {
            userData.data = {
              ID: doc.data()['ID'],
              isCoordinator: doc.data()['isCoordinator'],
              participatingEvents: doc.data()['participatingEvents'],
            };
          }
        });
      })
      .catch((error) => {
        //error
      });
  }
}
