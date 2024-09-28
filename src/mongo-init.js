db.createCollection('users');

db.users.insertMany([{
    username: "fv1",
    password: "12345678"
},{
    username: "fv2",
    password: "12345678"
},{
    username: "fv3",
    password: "12345678"
},{
    username: "fv4",
    password: "12345678"
},{
    username: "fv5",
    password: "12345678"
},{
    username: "fv6",
    password: "12345678"
},{
    username: "fv7",
    password: "12345678"
}]);

userid = db.users.findOne({username: "fv1"})._id

db.events.insertMany([{
    userid: userid,
    events: [{
      title: "evento utente 1",
      start: "2024-09-27T16:11:00.823+00:00",
      end: "2024-09-28T16:11:00.823+00:00",
      allDay: false,
      location: "",
      id: "a1e4ace5-b70c-4ce4-9fdc-979b42b3543e",
      repetitionEvery: 7,
      repetitionCount: 1,
      advanceTime: 5,
      advanceRepCount: 0,
    }],
    activities: [{
      title: "attività utente 1",
      start: "2024-09-29T16:11:00.823+00:00",
      end: "2024-09-30T16:11:00.823+00:00",
      id: "90de1625-baee-4388-91ac-708f214addea",
      completed: false,
      notifyState: -1
    }]
}])

userid = db.users.findOne({username: "fv2"})._id

db.events.insertMany([{
    userid: userid,
    events: [{
      title: "evento utente 2",
      start: "2024-10-27T16:11:00.823+00:00",
      end: "2024-10-28T16:11:00.823+00:00",
      allDay: false,
      location: "",
      id: "a1e4ace5-b70c-4ce4-9fdc-979b42b3543e",
      repetitionEvery: 7,
      repetitionCount: 1,
      advanceTime: 5,
      advanceRepCount: 0,
    }],
    activities: [{
      title: "attività utente 2",
      start: "2024-10-29T16:11:00.823+00:00",
      end: "2024-10-30T16:11:00.823+00:00",
      id: "90de1625-baee-4388-91ac-708f214addea",
      completed: false,
      notifyState: -1
    }]
}])