export enum EventType{
  infrastructure = "infrastructure",
  education = "education", 
  campaigns = "campaign",
  funding = "funding",
  protest = "protest"
}
export interface Event {
  ID: number;
  Name: string;
  EventType: EventType,
  Date: Date,
  Location: string,
  Description: string
}