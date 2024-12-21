# Greet and Meet
Greet and meet is a social application for creating, organizing and finding activities all over the world! It can be anything from finding a running buddy to your afternoon workout to fidning the last player to a board game night. There is something for everyone! Join now and don't miss out on the fun!

### Application
https://greet-and-meet.vercel.app/

### Tech used 
- [Next.js 15](https://nextjs.org/)
- [Appwrite.io](https://appwrite.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Mapbox](https://www.mapbox.com/)

## How to

### Landing page
Navigate to https://greet-and-meet.vercel.app/. Here you can see the next three upcoming activities and click the activity cards for more details. You need to sign in to see the full activity feed. 

### Sign up
Sign up to the application: https://greet-and-meet.vercel.app/sign-up

### Sign in
Sign in to the application: https://greet-and-meet.vercel.app/sign-in

### Feed
Navigate to https://greet-and-meet.vercel.app/activities to view all upcoming activities. You can filter by activity type. More filter types to come, such as date range, and maximum distance and location. (Date range picker was implemented but removed due to React 19 peer dependency error while building the application)

### Activity details
Navigate to https://greet-and-meet.vercel.app/activities/[activityId] to view details for an activity and send a **greeting** to request to join an activity. If you are the creator for the activity you can view all pending request and change status for the attendees to either Accepted, Rejected or back to Pending. 

### Attending activities
Navigate to https://greet-and-meet.vercel.app/attending to see the activities that you are attending or have been attending. You can see if your status has been updated to accepted or rejected and you can see the time until an activity starts. 

### My activities
Navigate to https://greet-and-meet.vercel.app/activities/user to see your activities, both upcoming and past. You can delete upcoming activities that you have created. 
#### Create activity
At the top right you can create an activity. Fill in the required information, type, datetime and place a marker on the map to set the activity location. 

## Todo 
* [ ] Send notification using **appwrite** to activity creator if user sends greeting to join. 
* [ ] Send notification using **appwrite** to attendee if activity status is changed.
* [ ] Send notification using **appwrite** to attendee if activity has been deleted or updated.
* [ ] Implement chat functionality using **appwrite** for all participants attending an activity.
* [ ] Implement file uploads using **appwrite** to activities for more detailed information.
* [ ] Implement Oauth2 sign in.
* [ ] Update an existing activity.
* [ ] Follow users and get notified when they create new activities. 
* [ ] Search activity by date range.
* [ ] Search activtity using location. 
* [ ] Cursor Pagination for infinite scroll.




