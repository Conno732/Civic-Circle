import { Component } from '@angular/core';
import { EVENTS, CURRENTEVENTS } from '../../data/events';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from 'src/globals';
import { Event, EventType } from '../../entities/event_entity';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent {
  events = EVENTS;
  currentEvents = CURRENTEVENTS;

  constructor() {
    this.listEvents([]);
  }

  listEvents(preferences: string[]) {
    this.getEvents(preferences).then((res) => {
      // res is the list of events
      // display the below..

      // IF SORT BY EVENT IS CAUSED YOU CAN PASS IN PREFERENCES,
      // IF NO SORT STUFF, PASS IN EMPTY ARRAY
      this.events = res;
      console.log(res);
    });
  }

  listIntEvents(preferences: string[], interested: number[]) {
    this.getEvents(preferences).then((res) => {
      res = res.filter((e) => {
        e.ID in interested;
      });
      // res is the list of events
      // display the below..
      // IF SORT BY EVENT IS CAUSED YOU CAN PASS IN PREFERENCES,
      // IF NO SORT STUFF, PASS IN EMPTY ARRAY


      console.log(res);
    });
  }

  async getEvents(preferences: string[]) {
    const q = query(collection(db, 'event'));
    const querySnapshot = await getDocs(q);
    let tmp: Event[] = [];
    querySnapshot.forEach((doc) => {
      if (
        preferences.toString() === [].toString() ||
        doc.data()['eventType'] in preferences
      ) {
        let ttt: string = doc.data()['eventType'];
        let tEvent: Event = {
          ID: doc.data()['ID'],
          Name: doc.data()['Name'],
          EventType: ttt as EventType,
          Date: doc.data()['Date'],
          Location: doc.data()['Location'],
          Description: doc.data()['Description'],
        };
        tmp.push(tEvent);
      }
    });
    return tmp;
  }
  eventTypeArray = Object.values(EventType);
}
