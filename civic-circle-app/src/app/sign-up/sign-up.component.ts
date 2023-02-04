import { Component } from '@angular/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth, userData } from 'src/globals';

import { collection, doc, setDoc, getDocs, query } from 'firebase/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signup(email: string, password: string, preferences: string[]) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Created user account, redirect here
        let tmp = userCredential.user.email
          ? userCredential.user.email
          : 'error';
        const ref = collection(db, 'user');

        await setDoc(doc(ref, tmp), {
          ID: 111,
          isCoordinator: false,
          participatingEvents: [],

          name: name,
          location: location,
        }).then(async () => {
          let q = query(ref);
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            if (doc.id == userCredential.user.email) {
              userData.data = {
                ID: doc.data()['ID'],
                isCoordinator: doc.data()['isCoordinator'],
                participatingEvents: doc.data()['participatingEvents'],
                name: doc.data()['name'],
                location: doc.data()['location'],
              };
            }
            this.router.navigate(['/events']);
          });

        });
      })
      .catch((error) => {
        //errror
        console.log('already account');
      });
  }
}
