export type NoteState = {
    id: string,
    title: string,
    body: string,
    category: string,
    date_edit: Date,
    date_create: Date,
    marked: boolean
  }
  
export type TomatoState = {
    tStudio: number,
    tPausa: number,
    nCicli: number,
    title: string,
    start: Date,
    end: Date,
    id: string,
    completed: boolean,
    notifyState: number
  }
  
export type EventState = {
    title: string,
    start: Date,
    end: Date,
    allDay: boolean,
    location: string,
    id: string,
    repetitionEvery: number,
    repetitionCount: number,
    advanceTime: number,
    advanceRepCount: number,
  }
  
export type ActivityState = {
    title: string,
    start: Date,
    end: Date,
    id: string,
    completed: boolean,
    notifyState: number
  }